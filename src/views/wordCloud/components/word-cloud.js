/*
 * @Author: maggot-code
 * @Date: 2021-07-30 12:56:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 03:32:53
 * @Description: file content
 */
import WordCloud from "wordcloud";

const handlerImageData = (baseImageData, newImageData) => {
    for (let i = 0; i < baseImageData.data.length; i += 4) {
        const tone =
            baseImageData.data[i] +
            baseImageData.data[i + 1] +
            baseImageData.data[i + 2];
        const alpha = baseImageData.data[i + 3];

        if (alpha < 128 || tone > 128 * 3) {
            // Area not to draw
            newImageData.data[i] =
                newImageData.data[i + 1] =
                newImageData.data[i + 2] =
                255;
            newImageData.data[i + 3] = 0;
        } else {
            // Area to draw
            newImageData.data[i] =
                newImageData.data[i + 1] =
                newImageData.data[i + 2] =
                0;
            newImageData.data[i + 3] = 255;
        }
    }

    return newImageData;
}

const setMask = (img) => {
    const { width: w, height: h } = img;

    const maskCanvas = document.createElement('canvas');

    maskCanvas.width = w;

    maskCanvas.height = h;

    const maskCtx = maskCanvas.getContext('2d');

    maskCtx.drawImage(img, 0, 0, w, h);

    const baseImageData = maskCtx.getImageData(0, 0, w, h);

    const imageData = maskCtx.createImageData(baseImageData);

    maskCtx.putImageData(handlerImageData(baseImageData, imageData), 0, 0);

    return maskCanvas;
}

const getRefSize = (refs) => {
    const { clientWidth: w, clientHeight: h } = refs;

    return { refW: w, refH: h }
}

const CreateWordcloud = (options = {}) => {
    return new Promise((resolve, reject) => {
        const { refs, src, data, bgColor, fontColor } = options;

        const { refW, refH } = getRefSize(refs);

        const canvas = document.createElement('canvas');

        const img = new Image();

        img.src = src;

        img.onload = (response) => {
            const { target } = response;

            const { width: w, height: h } = target;

            canvas.width = refW;
            canvas.height = refH;

            const maskCanvas = setMask(target);
            const { width: mw, height: mh } = maskCanvas;

            const bctx = document.createElement('canvas').getContext('2d');
            bctx.fillStyle = bgColor || "#333";
            bctx.fillRect(0, 0, 1, 1);
            const bgPixel = bctx.getImageData(0, 0, 1, 1).data;

            const maskCanvasScaled = document.createElement("canvas");
            maskCanvasScaled.width = refW;
            maskCanvasScaled.height = refH;
            let ctx = maskCanvasScaled.getContext('2d');
            ctx.drawImage(maskCanvas, 0, 0, mw, mh, 0, 0, refW, refH);
            const imageData = ctx.getImageData(0, 0, w, h);
            const newImageData = ctx.createImageData(imageData);
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
                    newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0;
                }
            }
            ctx.putImageData(newImageData, 0, 0);
            ctx = canvas.getContext('2d');
            ctx.drawImage(maskCanvasScaled, 0, 0);

            WordCloud(canvas, {
                clearCanvas: false,
                list: data || [],
                gridSize: 1, // 密集程度 数字越小越密集
                weightFactor: 1, // 字体大小=原始大小*weightFactor
                maxFontSize: 16, //最大字号
                minFontSize: 12, //最小字号
                fontWeight: "normal", //字体粗细
                fontFamily: "Times, serif", // 字体
                color: fontColor || "random-light", // 字体颜色 'random-dark' 或者 'random-light'
                backgroundColor: "#333", // 背景颜色
                rotateRatio: 1, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
            });

            const baseCtx = canvas.getContext('2d');
            baseCtx.drawImage(target, 0, 0, refW, refH);

            refs.innerHTML = "";

            return resolve(canvas);
        }
    })
}

export {
    handlerImageData,
    setMask
}

export default CreateWordcloud