// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform float u_time;

// void main(){
    //     gl_FragColor=vec4(abs(sin(u_time)),abs(cos(u_time)),abs(cos(u_time)),1.);
// }

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// 画布尺寸（宽，高）
uniform vec2 u_mouse;// 鼠标位置（在屏幕上哪个像素）
uniform float u_time;// 时间（加载后的秒数）

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    gl_FragColor=vec4(st.x,st.y,0.,1.);
}