#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
// 大于0.02 ==> 0
// =0 ==> 1
float plot(vec2 st){
    return smoothstep(.02,0.,abs(st.y-st.x));
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float y=st.x;
    
    // 自动映射3个
    vec3 color=vec3(y);
    
    // Plot a line
    float pct=plot(st);
    color=(1.-pct)*color+pct*vec3(0.,1.,0.);
    
    gl_FragColor=vec4(color,1.);
}