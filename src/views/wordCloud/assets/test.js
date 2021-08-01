/*
 * @Author: maggot-code
 * @Date: 2021-07-30 00:34:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 03:12:01
 * @Description: file content
 */

// https://wordcloud2-js.timdream.org/index.js
var run = function run() {
    $loading.prop('hidden', false);

    // Load web font
    $webfontLink.prop('href', $css.val());

    // devicePixelRatio
    var devicePixelRatio = parseFloat($dppx.val());

    // Set the width and height
    var width = $width.val() ? $width.val() : $('#canvas-container').width();
    var height = $height.val() ? $height.val() : Math.floor(width * 0.65);
    var pixelWidth = width;
    var pixelHeight = height;

    if (devicePixelRatio !== 1) {
        $canvas.css({ 'width': width + 'px', 'height': height + 'px' });

        pixelWidth *= devicePixelRatio;
        pixelHeight *= devicePixelRatio;
    } else {
        $canvas.css({ 'width': '', 'height': '' });
    }

    $canvas.attr('width', pixelWidth);
    $canvas.attr('height', pixelHeight);

    $htmlCanvas.css({ 'width': pixelWidth + 'px', 'height': pixelHeight + 'px' });

    // Set the options object
    var options = {};
    if ($options.val()) {
        options = (function evalOptions() {
            try {
                return eval('(' + $options.val() + ')');
            } catch (error) {
                alert('The following Javascript error occurred in the option definition; all option will be ignored: \n\n' +
                    error.toString());
                return {};
            }
        })();
    }

    // Set devicePixelRatio options
    if (devicePixelRatio !== 1) {
        if (!('gridSize' in options)) {
            options.gridSize = 8;
        }
        options.gridSize *= devicePixelRatio;

        if (options.origin) {
            if (typeof options.origin[0] == 'number')
                options.origin[0] *= devicePixelRatio;
            if (typeof options.origin[1] == 'number')
                options.origin[1] *= devicePixelRatio;
        }

        if (!('weightFactor' in options)) {
            options.weightFactor = 1;
        }
        if (typeof options.weightFactor == 'function') {
            var origWeightFactor = options.weightFactor;
            options.weightFactor =
                function weightFactorDevicePixelRatioWrap() {
                    return origWeightFactor.apply(this, arguments) * devicePixelRatio;
                };
        } else {
            options.weightFactor *= devicePixelRatio;
        }
    }

    // Put the word list into options
    if ($list.val()) {
        var list = [];
        $.each($list.val().split('\n'), function each(i, line) {
            if (!$.trim(line))
                return;

            var lineArr = line.split(' ');
            var count = parseFloat(lineArr.shift()) || 0;
            list.push([lineArr.join(' '), count]);
        });
        options.list = list;
    }

    if (maskCanvas) {
        options.clearCanvas = false;

        /* Determine bgPixel by creating
           another canvas and fill the specified background color. */
        var bctx = document.createElement('canvas').getContext('2d');

        bctx.fillStyle = options.backgroundColor || '#fff';
        bctx.fillRect(0, 0, 1, 1);
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

        var maskCanvasScaled =
            document.createElement('canvas');
        maskCanvasScaled.width = $canvas[0].width;
        maskCanvasScaled.height = $canvas[0].height;
        var ctx = maskCanvasScaled.getContext('2d');

        ctx.drawImage(maskCanvas,
            0, 0, maskCanvas.width, maskCanvas.height,
            0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var newImageData = ctx.createImageData(imageData);
        for (var i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] > 128) {
                newImageData.data[i] = bgPixel[0];
                newImageData.data[i + 1] = bgPixel[1];
                newImageData.data[i + 2] = bgPixel[2];
                newImageData.data[i + 3] = bgPixel[3];
            } else {
                // This color must not be the same w/ the bgPixel.
                newImageData.data[i] = bgPixel[0];
                newImageData.data[i + 1] = bgPixel[1];
                newImageData.data[i + 2] = bgPixel[2];
                newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 0;
            }
        }

        ctx.putImageData(newImageData, 0, 0);

        ctx = $canvas[0].getContext('2d');
        ctx.drawImage(maskCanvasScaled, 0, 0);

        maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
    }

    // Always manually clean up the html output
    if (!options.clearCanvas) {
        $htmlCanvas.empty();
        $htmlCanvas.css('background-color', options.backgroundColor || '#fff');
    }

    // All set, call the WordCloud()
    // Order matters here because the HTML canvas might by
    // set to display: none.
    WordCloud([$canvas[0], $htmlCanvas[0]], options);
};


$mask.on('change', function () {
    maskCanvas = null;

    var file = $mask[0].files[0];

    if (!file) {
        return;
    }

    var url = window.URL.createObjectURL(file);
    var img = new Image();
    img.src = url;

    img.onload = function readPixels() {
        window.URL.revokeObjectURL(url);

        maskCanvas = document.createElement('canvas');
        maskCanvas.width = img.width;
        maskCanvas.height = img.height;

        var ctx = maskCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var imageData = ctx.getImageData(
            0, 0, maskCanvas.width, maskCanvas.height);
        var newImageData = ctx.createImageData(imageData);

        for (var i = 0; i < imageData.data.length; i += 4) {
            var tone = imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2];
            var alpha = imageData.data[i + 3];

            if (alpha < 128 || tone > 128 * 3) {
                // Area not to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 255;
                newImageData.data[i + 3] = 0;
            } else {
                // Area to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 0;
                newImageData.data[i + 3] = 255;
            }
        }

        ctx.putImageData(newImageData, 0, 0);
    };
});

// const canvas = document.createElement("canvas");
// const img = new Image();
// img.src = BaseImg;
// img.onload = (response) => {
//     const { target } = response;
//     const { width, height } = target;
//     canvas.width = width;
//     canvas.height = height;

//     const maskCanvas = this.change(target);

//     const bctx = document.createElement("canvas").getContext("2d");
//     bctx.fillStyle = "#333";
//     bctx.fillRect(0, 0, 1, 1);
//     const bgPixel = bctx.getImageData(0, 0, 1, 1).data;
//     const maskCanvasScaled = document.createElement("canvas");
//     maskCanvasScaled.width = width;
//     maskCanvasScaled.height = height;
//     let ctx = maskCanvasScaled.getContext("2d");
//     ctx.drawImage(
//         maskCanvas,
//         0,
//         0,
//         maskCanvas.width,
//         maskCanvas.height,
//         0,
//         0,
//         maskCanvasScaled.width,
//         maskCanvasScaled.height
//     );
//     const imageData = ctx.getImageData(0, 0, width, height);
//     const newImageData = ctx.createImageData(imageData);
//     for (var i = 0; i < imageData.data.length; i += 4) {
//         if (imageData.data[i + 3] > 128) {
//             newImageData.data[i] = bgPixel[0];
//             newImageData.data[i + 1] = bgPixel[1];
//             newImageData.data[i + 2] = bgPixel[2];
//             newImageData.data[i + 3] = bgPixel[3];
//         } else {
//             // This color must not be the same w/ the bgPixel.
//             newImageData.data[i] = bgPixel[0];
//             newImageData.data[i + 1] = bgPixel[1];
//             newImageData.data[i + 2] = bgPixel[2];
//             newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0;
//         }
//     }
//     ctx.putImageData(newImageData, 0, 0);

//     ctx = canvas.getContext("2d");
//     ctx.drawImage(maskCanvasScaled, 0, 0);

//     WordCloud(canvas, {
//         clearCanvas: false,
//         list: setList(TestData),
//         gridSize: 1, // 密集程度 数字越小越密集
//         weightFactor: 1, // 字体大小=原始大小*weightFactor
//         maxFontSize: 16, //最大字号
//         minFontSize: 12, //最小字号
//         fontWeight: "normal", //字体粗细
//         fontFamily: "Times, serif", // 字体
//         color: "random-light", // 字体颜色 'random-dark' 或者 'random-light'
//         backgroundColor: "#333", // 背景颜色
//         rotateRatio: 1, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
//     });

//     const baseCtx = canvas.getContext("2d");
//     baseCtx.drawImage(target, 0, 0, width, height);

//     this.$refs.main.appendChild(canvas);
// };