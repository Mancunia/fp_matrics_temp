const Error = ({extra}) => {
    return ( 
        <div>
            <span style={{fontSize:'30pt',color:'rgba(255,0,0,0.3)'}}>
                Error!!
            </span>
            <span style={{fontSize:'19pt',color:'rgba(255,0,0,0.7)'}}>
                {extra}
            </span>
        </div>
     );
}
 
export default Error;