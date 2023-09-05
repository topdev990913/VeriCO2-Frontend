import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTab } from '../redux/actions/index';
import '../App.scss';

function CalculationPage({ sideBarFlag, setSideBarFlag, SERVER_URL }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    dispatch(setTab(2));
    const [listData, setListData] = useState([])
    const [category, setCategory] = useState(0)
    const [method, setMethod] = useState(0)
    useEffect(() => {
        const cookies = new Cookies();
        if (!cookies.get('token')) {
            navigate('/login');
        }
        else {
            axios.get(SERVER_URL + '/calculation')
                .then(res => {
                    //   console.log(res.data)
                    setListData([...res.data])
                    setCategory(0)
                    setMethod(0)
                })
        }
    }, [SERVER_URL, navigate])
    return (
        <div className='CalculationPage' onClick={() => setSideBarFlag(false)}>
            <Header sideBarFlag={sideBarFlag} setSideBarFlag={setSideBarFlag} />
            <div className='cluster'>
                <span className='title'>Scope 3 Emission Performance (t of CO₂)</span>
                <div className='main'>
                    <div className='box'>
                        <span className='title'>15 Categories</span>
                        {
                            listData?.map((item, index) => {
                                return (
                                    <span className={index === category ? 'selected' : ''} key={'category' + index} onClick={() => {
                                        setCategory(index)
                                        setMethod(0)
                                    }}>• {item?.title}</span>
                                )
                            })
                        }
                    </div>
                    <div className='center'>
                        <div className='box'>
                            <span className='title'>Methods for category {category + 1}</span>
                            {
                                listData[category]?.details?.map((item, index) => {
                                    return (
                                        <span className={method === index ? 'selected' : ''} key={'method' + index} onClick={() => {
                                            setMethod(index)
                                        }}>• {item}</span>
                                    )
                                })
                            }
                        </div>
                        <div className='box'>
                            <span className='title'>Input Data</span>
                            <div className='table-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Purchased good</th>
                                            <th>Supplier</th>
                                            <th>Quantities purchased(kg)</th>
                                            <th>Surpplier-specific(kgco2/kg)</th>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>Supplier C</td>
                                            <td><input type='text' placeholder='200000' className='Input_form'/></td>
                                            <td><input type='text' placeholder='0.15' className='Input_form'/></td>
                                        </tr>
                                        <tr>
                                            <td>Plaster</td>
                                            <td>Supplier D</td>
                                            <td><input type='text' placeholder='600000' className='Input_form'/></td>
                                            <td><input type='text' placeholder='0.1' className='Input_form'/></td>
                                        </tr>
                                        <tr>
                                            <td>Paint</td>
                                            <td>Supplier E</td>
                                            <td><input type='text' placeholder='200000' className='Input_form'/></td>
                                            <td><input type='text' placeholder='0.1' className='Input_form'/></td>
                                        </tr>
                                        <tr>
                                            <td>Timber</td>
                                            <td>Supplier F</td>
                                            <td><input type='text' placeholder='100000' className='Input_form'/></td>
                                            <td><input type='text' placeholder='0.25' className='Input_form'/></td>
                                        </tr>
                                        <tr>
                                            <td>Concrete</td>
                                            <td>Supplier G</td>
                                            <td><input type='text' placeholder='50000' className='Input_form'/></td>
                                            <td><input type='text' placeholder='0.20' className='Input_form'/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='button'>Upload Data</div>
                        </div>
                    </div>
                    <div className='box'>
                        <span className='title'>Emission Overview</span>
                        <div className='scopes-container'>
                            <div className='scopes'>
                                <div className='top'>
                                    <span>Scope 3 Emission:</span>
                                    <div>
                                        <span>436.51K</span>
                                        <span>38.57%</span>
                                    </div>
                                </div>
                                <div className='bottom'>
                                    <div className='item'>
                                        <span>Scope 1:</span>
                                        <span>334.65K</span>
                                    </div>
                                    <div className='item'>
                                        <span>Scope 2:</span>
                                        <span>132.88K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className='title'>Scope 3 YOY Performance:</span>
                        <div className='performance'>
                            <span>423K</span>
                            <span>436K</span>
                            <span>-3.2%</span>
                        </div>
                        <span className='title'>Emission Source:</span>
                        <div className='source-container'>
                            <div className='source'>
                                <span className='left'>54%</span>
                                <span className='right'>46%</span>
                            </div>
                        </div>
                        <div className='button'>Start Calculation</div>
                        <div className='button red' onClick={() => navigate('/display')} >Emission display</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CalculationPage