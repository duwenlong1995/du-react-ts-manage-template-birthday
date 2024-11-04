export const HtmlContent = {
  dom: `
  <style>
  .dialog-container {
      width: 100%; /* 修改为更小的宽度 */
      height: 100%;
      background-color: #f0f0f0;
      padding: 5px; /* 减小内边距 */
      border-radius: 2px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .box-container {
      color: #333;
      font-family: Arial, sans-serif;
  }
  .tip-green {
      background-color: #e0f7e0;
      padding: 2px; /* 减小内边距 */
      border-radius: 5px;
  }
  .line-green {
      height: 2px;
      background-color: #66bb6a;
      margin-top: 5px; /* 减小间距 */
  }
  .label-value-green {
      color: #4caf50;
      font-weight: bold;
      font-size: 14px; /* 调整字体大小 */
  }
  .title {
      font-size: 4px; /* 调整字体大小 */
      margin-bottom: 2px; /* 减小底部间距 */
      font-weight: bold;
  }
</style>
<div class="box-container">
<div class='tip-green' >
    <div class="title">设备名称 :测试</div>
    <div class="label-text">
        温度 :
        <span class="mr5" class='label-value-green'>
  50
        </span>
        <span class='label-value-green'>
            正常
        </span>
    </div>
    <div class="label-text">
        漏水 :
        <span class="mr5" class='label-value-green'>
40
</span>
        <span class='label-value-green'>
            正常
        </span>
    </div>
</div>
<div class=line-green></div>`,
  position: { x: 0, y: 0, z: 0 },
}
