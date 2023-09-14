import React, {useState, useEffect} from 'react'
import '../../App.scss'
function UseIndirect({onChange}) {
    const [v0, setV0]= useState(1000);
    const [v1, setV1]= useState(20);
    const [v2, setV2]= useState(2000);
    const [v3, setV3]= useState(0.4);
    const [v4, setV4]= useState(0.5);
    const [v5, setV5]= useState(40);
    const [v6, setV6]= useState(0.5);
    const [v7, setV7]= useState(0.5);
    const [v8, setV8]= useState(40);
    const [v9, setV9]= useState(1.2);
    const [v10, setV10]= useState(0.5);
    useEffect(()=>{
        onChange(Number(v0)*Number(v1)*Number(v2)*Number(v3)+Number(v4)*Number(v5)*Number(v6)*Number(v7)+Number(v8)*Number(v9)*Number(v10))
    },[
        v0,v1,v2,v3,v4,v5,v6,v7,v8,v9, v10,
    ])
    return (
        // <div className='SignupPage' onClick={() => setfake1(true)}>
        <div className='container'>
            <span className='title'>Input Data</span>
            <div className='table-container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Usage  temperature setting</th>
                            <th>Lifetime uses per product (washes)</th>
                            <th>Consumers using temperature setting (percent)</th>
                            <th>Products sold</th>
                            <th>Electricity consumed per use (KWh)</th>
                            <th>Emission factor (KgCO2e/KWh)</th>
                        </tr>
                        <tr>
                            <td>30°C cotton wash</td>
                            <td rowSpan={3}><input type='text' defaultValue='1000' className='Input_form' /></td>
                            <td><input type='text' defaultValue='20' className='Input_form' /></td>
                            <td rowSpan={3}><input type='text' defaultValue='2000' className='Input_form' /></td>
                            <td><input type='text' defaultValue='0.40' className='Input_form' /></td>
                            <td><input type='text' defaultValue='0.5' className='Input_form' /></td>
                        </tr>
                        <tr>
                            <td>40°C cotton wash</td>
                            <td><input type='text' defaultValue='40' className='Input_form' /></td>
                            <td><input type='text' defaultValue='0.50' className='Input_form' /></td>
                            <td><input type='text' defaultValue='0.5' className='Input_form' /></td>
                        </tr>
                        <tr>
                            <td>90°C cotton wash</td>
                            <td><input type='text' defaultValue='40' className='Input_form' /></td>
                            <td><input type='text' defaultValue='1.20' className='Input_form' /></td>
                            <td><input type='text' defaultValue='0.5' className='Input_form' /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UseIndirect