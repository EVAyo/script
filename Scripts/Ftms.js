// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: tv;

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule;
const {DmYY, Runing} = require('./DmYY');

// @组件代码开始
class Widget extends DmYY {
  constructor(arg) {
    super(arg);
    this.name = '一汽丰田';
    this.en = 'ftms';
    config.runsInApp && this.registerAction('基础设置', this.setWidgetConfig);
    this.cacheName = this.md5(`dataSouce_${this.en}`);
    this.logo =
      'https://www.toyota.com.cn/favicon.ico';
  }

  widgetHeight = 145;
  baseOpt = {
    headers: {
      Connection: `keep-alive`,
      Host: `appiov.ftms.com.cn`,
      'Content-Type': `application/json`,
    },
    body: ``,
  };
  serveInfo = {
    carNumber: '',
  };
  dataSource = {
    remoteInfo: {
      datatime: '',
      list: [],
      userId: '',
      carNumber: '',
    },
    monitorInfo: {
      km: '0',
      oilRate: '0',
      oilWaste: '0',
    },
  };

  init = async () => {
    if (this.settings.dataSource) {
      this.serveInfo = this.settings.serveInfo;
      this.dataSource = this.settings.dataSource;
    } else {
      await this.cacheData();
    }
    this.cacheData();
  };

  cacheData = async () => {
    try {
      await this.getBmuServeHicleInfo();
      await this.getRemoteInfoDetail();
    } catch (e) {
      console.log(e);
    }
  };

  getBaseOptions(api) {
    const baseURL = `https://appiov.ftms.com.cn`;
    return {url: `${baseURL}/${api}`, ...this.baseOpt};
  }

  getRemoteInfoDetail = async () => {
    const options = this.getBaseOptions(
      'ftms-iov-app-gbook/api/gbook/getRemoteInfoDetail',
    );
    const respones = await this.$request.post(options);
    if (respones.msg === 'success') {
      this.dataSource.remoteInfo = respones.result;
    }
    await this.getDrivingMonitorInfo();
  };

  getDrivingMonitorInfo = async () => {
    const options = this.getBaseOptions(
      'ftms-iov-app-gbook/api/gbook/getDrivingMonitorInfo',
    );
    const respones = await this.$request.post(options);
    if (respones.msg === 'success') {
      this.dataSource.monitorInfo = respones.result;
    }
    this.settings.dataSource = this.dataSource;
    this.saveSettings(false);
  };

  getBmuServeHicleInfo = async () => {
    let headers = await this.getCache('@ftms.headers');
    headers = JSON.parse(headers || '{}');
    this.baseOpt.headers = {token: headers.token, ...this.baseOpt.headers};
    const options = {
      url: `https://superapp.ftms.com.cn/superapp/users/wt/getbmuservehicleinfo?scriptable=1`,
      headers,
    };
    if (!this.settings.serveInfo) {
      const response = await this.$request.post(options);
      if (response.code === '200') {
        this.settings.serveInfo = response.data;
        this.serveInfo = response.data;
        this.saveSettings(false);
      }
    } else {
      this.serveInfo = this.settings.serveInfo || {};
    }
    this.baseOpt.headers.userId = this.serveInfo.userId;
    this.baseOpt.body = JSON.stringify({vin: this.serveInfo.vin});
    this.baseOpt.headers.Authorization = `Bearer ${this.baseOpt.headers.token}`;
  };

  createProgressBar(
    soFar, total = 100, width = 400, height = 40, showPercentage = false) {
    const context = new DrawContext();
    context.size = new Size(width, height);
    context.opaque = false;
    context.respectScreenScale = true;

    // bar background
    context.setFillColor(new Color('#48484b'));
    const bgPath = new Path();
    bgPath.addRoundedRect(
      new Rect(0, 0, width, height), height / 2, (height / 2) - 1);
    context.addPath(bgPath);
    context.fillPath();

    // bar foreground
    context.setFillColor(new Color('#e8e8e8'));
    const fgPath = new Path();
    fgPath.addRoundedRect(
      new Rect(0, 0, (width * soFar) / total, height), height / 2,
      (height / 2) - 1,
    );
    context.addPath(fgPath);
    context.fillPath();

    if (showPercentage) {
      const percentage = ((soFar / total) * 100).toFixed(2);
      let xPos = (width * soFar) / total + 5;
      // if over 70%, show in foreground area
      // to ensure that it doesn't overflow the display
      if (percentage > 70) {
        xPos = (width * soFar) / total - 55;
      }

      context.setFont(Font.semiboldRoundedSystemFont(14));
      context.setTextColor(primaryTextColor);
      context.drawText(`${percentage}%`, new Point(xPos, (height / 14)));
    }

    return context.getImage();
  }

  renderBorder = (stack) => {
    stack.borderWidth = 1;
  };

  renderImage = async (uri) => {
    return this.$request.get(uri, 'IMG');
  };

  notSupport(w) {
    const stack = w.addStack();
    stack.addText('暂不支持');
    return w;
  }

  renderSmall = async (w) => {
    w.addSpacer();

    const stack = w.addStack();
    stack.layoutVertically();
    const headerStack = stack.addStack();
    headerStack.centerAlignContent();
    headerStack.addSpacer(10);
    const gasImg = await this.renderImage(
      `https://img.icons8.com/ios-glyphs/344/gas-station.png`);

    const gasIcon = headerStack.addImage(gasImg);
    gasIcon.imageSize = new Size(16, 16);
    headerStack.addSpacer(5);

    const oilRateStackText = headerStack.addText(
      `${this.dataSource.monitorInfo.oilRate}%`);
    oilRateStackText.textColor = this.widgetColor;
    oilRateStackText.font = Font.boldSystemFont(14);

    headerStack.addSpacer();
    const logImg = await this.renderImage(this.logo);
    const logImgStack = headerStack.addImage(logImg);
    logImgStack.imageSize = new Size(20, 20);
    headerStack.addSpacer(10);

    const bodyStack = stack.addStack();
    bodyStack.centerAlignContent();
    bodyStack.addSpacer();
    const progressImg = this.createProgressBar(
      this.dataSource.monitorInfo.oilRate);
    const progressBar = bodyStack.addImage(progressImg);
    progressBar.imageSize = new Size(this.widgetHeight, 28);
    bodyStack.addSpacer();

    stack.addSpacer();

    const oilWasteStack = stack.addStack();
    oilWasteStack.centerAlignContent();
    oilWasteStack.addSpacer();
    const oilWasteStackText = oilWasteStack.addText(
      `油耗：${this.dataSource.monitorInfo.oilWaste}L/100km`);
    oilWasteStackText.textColor = this.widgetColor;
    oilWasteStackText.font = Font.boldSystemFont(10);
    oilWasteStack.addSpacer();

    const kilometerStack = stack.addStack();

    kilometerStack.centerAlignContent();
    kilometerStack.addSpacer();
    const panoImg = await this.renderImage(
      `https://img.icons8.com/ios-glyphs/344/bar-chart.png`);
    const panoImgStack = kilometerStack.addStack();
    panoImgStack.setPadding(5, 0, 0, 0);
    const panoStack = panoImgStack.addImage(panoImg);
    panoStack.imageSize = new Size(20, 20);
    kilometerStack.addSpacer(5);

    const oilWasteText = kilometerStack.addText(this.dataSource.monitorInfo.km);
    oilWasteText.font = Font.boldSystemFont(28);
    oilWasteText.textColor = this.widgetColor;
    kilometerStack.addSpacer(5);
    const unitStack = kilometerStack.addStack();
    unitStack.setPadding(5, 0, 0, 0);
    const oilWasteUnit = unitStack.addText(
      'km');
    oilWasteUnit.font = Font.boldSystemFont(14);
    oilWasteUnit.textColor = this.widgetColor;
    kilometerStack.addSpacer();

    stack.addSpacer();

    const btBodyStack = stack.addStack();
    btBodyStack.addSpacer();
    const bottomStack = btBodyStack.addStack();
    bottomStack.setPadding(10, 0, 10, 0);
    bottomStack.centerAlignContent();
    bottomStack.addSpacer();
    bottomStack.cornerRadius = 20;
    bottomStack.backgroundColor = new Color('#e8e8e8');
    const dataTime = this.dataSource.remoteInfo.datatime.split(`-`);
    const countKmText = bottomStack.addText(
      `上传：${dataTime[1]}-${dataTime[2]}`);
    countKmText.textColor = this.widgetColor;
    countKmText.font = Font.boldSystemFont(12);
    countKmText.centerAlignText();
    bottomStack.addSpacer();
    w.addSpacer();
    return w;
  };

  renderLarge = async (w) => {
    return this.renderSmall(w);
  };

  renderMedium = async (w) => {
    const containerStack = w.addStack();
    containerStack.centerAlignContent();
    const carStack = containerStack.addStack();
    carStack.addSpacer();
    carStack.backgroundColor = new Color('#e8e8e8');

    carStack.layoutVertically();

    carStack.centerAlignContent();
    carStack.size = new Size(this.widgetHeight, this.widgetHeight);
    carStack.cornerRadius = 20;
    const carImg = await this.renderImage(
      `https://appiov.ftms.com.cn//ftmsIovUpload/image/20220219/42fb0b0b-e421-440b-9f41-1e25ba5219a1.png`);

    const carImgStack = carStack.addStack();
    const carResStack = carImgStack.addImage(carImg);
    carResStack.imageSize = new Size(137.5, 70);

    carStack.addSpacer();

    const carNumberStack = carStack.addStack();
    carNumberStack.addSpacer();
    carNumberStack.centerAlignContent();
    const carNumebrText = carNumberStack.addText(this.serveInfo.carNumber);
    carNumebrText.font = Font.boldSystemFont(24);
    carNumebrText.textColor = this.widgetColor;
    carNumebrText.centerAlignText();
    carNumberStack.addSpacer();

    carStack.addSpacer();

    const carSafeStack = carStack.addStack();
    carSafeStack.addSpacer();
    carSafeStack.centerAlignContent();
    const safeData = this.dataSource.remoteInfo.list.filter(
      item => item.security !== 'safe') || [];
    let safeText = ``;
    let safeIconImg;
    if (safeData.length > 0) {
      if (safeData.length === 1) {
        safeText = `${safeData[0].typeName}：${safeData[0].dataName}`;
      } else {
        safeText = `隐患：${safeData.length}`;
      }
      safeIconImg = carSafeStack.addImage(SFSymbol.named('lock.open').image);
    } else {
      safeIconImg = carSafeStack.addImage(SFSymbol.named('lock').image);
    }

    carSafeStack.addSpacer(5);
    const statusText = carSafeStack.addText(!safeText ? '已上锁' : safeText);
    statusText.centerAlignText();
    statusText.font = Font.systemFont(12);
    statusText.textColor = safeText ? new Color('#f5222d') : this.widgetColor;

    safeIconImg.tintColor = statusText.textColor;
    safeIconImg.imageSize = new Size(10, 14);

    carSafeStack.addSpacer();

    carStack.addSpacer();

    containerStack.addSpacer();
    const rightStack = containerStack.addStack();
    rightStack.layoutVertically();
    await this.renderSmall(rightStack);

    return w;
  };

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render() {
    await this.init();
    const widget = new ListWidget();
    widget.setPadding(10, 10, 10, 10);
    await this.getWidgetBackgroundImage(widget);
    if (this.widgetFamily === 'medium') {
      return await this.renderMedium(widget);
    } else {
      return await this.notSupport(widget);
    }
  }
}

// @组件代码结束
await Runing(Widget, '', false); //远程开发环境
