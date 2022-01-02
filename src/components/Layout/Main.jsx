import { MailboxDimensions } from "@styled-icons/bootstrap/Mailbox";
import { useEffect, useRef } from "react";

import styled from "styled-components";

const MainEle = ({ children, className }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef) {
      return;
    }
    let theCanvas = mainRef.current;
    const ctx = theCanvas.getContext("2d");
    let current_point = {
      x: null, //当前鼠标x
      y: null, //当前鼠标y
      max: 20000,
    };
    let canvas_width = (theCanvas.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth),
      canvas_height = (theCanvas.height =
        (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight)-120),
      random_points = [],
      all_points = [];

    theCanvas.style = "position: absolute; top: 0px; left: 0px;";

    function draw() {
      //清屏
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      let i, pi, x_dist, y_dist, dist, w;

      //遍历点集合绘制线条，类似于握手问题，两个点只绘制一条线
      random_points.forEach((p, index) => {
        (p.x += p.xa), //按指定速度移动
          (p.y += p.ya),
          //小球碰撞则速度取相反数
          (p.xa *= p.x > canvas_width || p.x < 0 ? -1 : 1),
          (p.ya *= p.y > canvas_height || p.y < 0 ? -1 : 1),

					ctx.fillStyle="#a09ea3";
					ctx.arc(p.x - 0.5, p.y - 0.5, 100, 0, 2*Math.PI);
					ctx.stroke(); //畫出你定義的圖形，若忘了這行，圈圈就不會出現
          ctx.fillRect(p.x - 0.5, p.y - 0.5, 2, 2); //绘制点

        for (i = index + 1; i < all_points.length; i++) {
          pi = all_points[i];
          if (pi.x !== null && pi.y !== null) {
            x_dist = p.x - pi.x;
            y_dist = p.y - pi.y;
            dist = x_dist * x_dist + y_dist * y_dist;
            //当两点距离小于极限距离时会产生连线，当第二个点是鼠标所产生点时，第一个点在范围内会产生向鼠标点的速度，产生吸附效果
            dist < pi.max &&
              pi === current_point &&
              dist >= pi.max / 2 &&
              ((p.x -= 0.03 * x_dist), (p.y -= 0.03 * y_dist));
            //根据距离计算连线的透明度，使过度效果流畅
            w = (pi.max - dist) / pi.max;
            ctx.beginPath();
            ctx.lineWidth = w / 2;
            ctx.strokeStyle = `rgba(110,110,110,${w + 0.2})`;
						// ctx.strokeStyle = `#70e0b0`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pi.x, pi.y);
            ctx.stroke();
          }
        }
      }),
        requestAnimationFrame(draw);
    }
    window.onmousemove = (e) => {
      e = e || window.event;
      current_point.x = e.clientX;
      current_point.y = e.clientY;
    };
    window.onmouseout = () => {
      current_point.x = null;
      current_point.y = null;
    };

    //随机生成50个点
    for (let i = 0; i < 50; i++) {
      let x = Math.random() * canvas_width, //初始坐标
        y = Math.random() * canvas_height,
        xa = 4 * Math.random() - 1, //x速度
        ya = 4 * Math.random() - 1, //y速度
        max = 6000; //会产生连线的距离的平方

      random_points[i] = { x, y, xa, ya, max };
    }
    //将鼠标的点添加至点集合中
    all_points = [...random_points, current_point];
    //只是背景特效-所以延迟执行
    const cavaseAni = setTimeout(()=>{
      draw()
    }, 1000);

    return () => {
      clearTimeout(cavaseAni);
    };

  }, []);

  return (
    <div className={className}>
      <canvas ref={mainRef} className="canvas"></canvas>
      <div className="main">{children}</div>
    </div>
  );
};

const Main = styled(MainEle)`
  position: relative;
	width: 100%;
	height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  .main{
    width: 1200px;
    height: 100%;
    z-index: 9999;
  }
  .canvas{
    z-index:0;
  }
`;

export default Main;
