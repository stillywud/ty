// 说明：
// 此处用于 在加载完地图资源后再执行地图相关的代码,
// 地图所需的对象在加载js资源成功后会注册在window下,
// 具体使用可参考 高德地图api
// 使用方法：
// 1. import引入此插件,例：
//    import $initTyMap from '@/ext_components/tianyuan/components/map/tymap.js';
// 2. 在created或mounted等其他所需使用的方法中，调用该地图方法，例：
    // $initTyMap(()=>{
    //   console.log('news map',window.AMap);
    //   //此处书写调用成功后触发的内容
    //   //调用失败，不会执行这里的js
    // });

    const $initTyMap = (callback)=>{
        if(window.AMap){
          console.log('地图组件加载完成');
          callback(true);
        }else{
          setTimeout(() => {
            $initTyMap(callback);
          }, 500);
        }
    };
    export default $initTyMap;