import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTab } from '../redux/actions/index';
import '../App.scss';
import PurchasedSupplier from './inputTable/1_1';
import PurchasedHybrid from './inputTable/1_2';
import PurchasedAverage from './inputTable/1_3';
import PurchasedSpend from './inputTable/1_4';
import UpstreamFuel from './inputTable/3_1';
import UpstreamDistance from './inputTable/3_2';
import UpstreamSpend from './inputTable/3_3';
import WasteWaste from './inputTable/4_1';
import WasteAverage from './inputTable/4_2';
import BusinessFuel from './inputTable/5_1';
import EmployeeDistance from './inputTable/6_1';
import EmployeeAverage from './inputTable/6_2';
import UpstreamAsset from './inputTable/7_1';
import ProcessingSite from './inputTable/9_1';
import ProcessingAverage from './inputTable/9_2';
import UseDirect from './inputTable/10_1';
import UseIndirect from './inputTable/10_2';
import EndWaste from './inputTable/11_1';
import Downstream from './inputTable/12_1';
import FranchisesSpecific from './inputTable/13_1';
import FranchisesAverage from './inputTable/13_2';
import InvestmentSpecific from './inputTable/14_1';
import InvestmentAverage from './inputTable/14_2';
import FuelTransmission from './inputTable/1_15';

function CalculationPage({ sideBarFlag, setSideBarFlag, SERVER_URL }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [result1_1, setResult1_1] = useState(0);
    const [result1_2, setResult1_2] = useState(0);
    const [result1_3, setResult1_3] = useState(0);
    const [result1_4, setResult1_4] = useState(0);
    const [result3_1, setResult3_1] = useState(0);
    const [result3_2, setResult3_2] = useState(0);
    const [result1_15, setResult1_15] = useState(0);
    const [result3_3, setResult3_3] = useState(0);
    dispatch(setTab(2));
    const [listData, setListData] = useState([])
    const [category, setCategory] = useState(0)
    const [method, setMethod] = useState(0)
    const [startCalculation, setStartCalculation] = useState(false)
    console.log("Category", category)
    console.log("method", method)
    console.log("calculation", startCalculation)
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
                    setStartCalculation(false)
                })
        }
    }, [SERVER_URL, navigate])
    const displaycase = () => {
        if (category === 0 & method === 0) return <PurchasedSupplier onChange={(data) => { setResult1_1(data)}} />
        if (category === 0 & method === 1) return <PurchasedHybrid onChange={(data) => { setResult1_2(data)}} />
        if (category === 0 & method === 2) return <PurchasedAverage onChange={(data) => { setResult1_3(data)}} />
        if (category === 0 & method === 3) return <PurchasedSpend onChange={(data) => { setResult1_4(data)}} />
        if (category === 3 & method === 0) return <UpstreamFuel onChange={(data) => { setResult3_1(data)}} />
        if (category === 3 & method === 1) return <UpstreamDistance onChange={(data) => { setResult3_2(data)}} />
        if (category === 3 & method === 2) return <UpstreamSpend onChange={(data) => { setResult3_3(data) }}/>
        if (category === 4 & method === 0) return <WasteWaste />
        if (category === 4 & method === 1) return <WasteAverage />
        if (category === 5 & method === 0) return <BusinessFuel />
        if (category === 6 & method === 0) return <EmployeeDistance />
        if (category === 6 & method === 1) return <EmployeeAverage />
        if (category === 7 & method === 0) return <UpstreamAsset />
        if (category === 9 & method === 0) return <ProcessingSite />
        if (category === 9 & method === 1) return <ProcessingAverage />
        if (category === 10 & method === 0) return <UseDirect />
        if (category === 10 & method === 1) return <UseIndirect />
        if (category === 11 & method === 0) return <EndWaste />
        if (category === 12 & method === 0) return <Downstream />
        if (category === 13 & method === 0) return <FranchisesSpecific />
        if (category === 13 & method === 1) return <FranchisesAverage />
        if (category === 14 & method === 0) return <InvestmentSpecific />
        if (category === 14 & method === 1) return <InvestmentAverage />
        if (category === 2 & method === 0) return <FuelTransmission onChange={(data) => { setResult1_15(data) }} />
        else return <PurchasedSupplier onChange={(data) => { setResult1_1(data) }} />
    }

    const displayresult = () => {
        if (category === 0 & method === 0 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{result1_1 / 1000}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result1_1 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result1_1 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result1_1 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result1_1 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 0 & method === 1 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{result1_2 / 1000}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result1_2 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result1_2 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result1_2 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result1_2 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 0 & method === 2 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{(result1_3 / 1000).toFixed(1)}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result1_3 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result1_3 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result1_3 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result1_3 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 0 & method === 3 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{(result1_4 / 1000).toFixed(1)}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result1_4 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result1_4 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result1_4 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result1_4 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 2 & method === 0 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{(result1_15 / 1000).toFixed(1)}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result1_15 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result1_15 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result1_15 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result1_15 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 3 & method === 0 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{(result3_1 / 1000).toFixed(1)}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result3_1 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result3_1 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result3_1 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result3_1 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 3 & method === 1 & startCalculation === true) return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span>{(result3_2 / 1000).toFixed(1)}K</span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span>{(result3_2 / 1000 * 0.54).toFixed(1)}K</span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span>{(result3_2 / 1000 * 0.46).toFixed(1)}K</span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>{(result3_2 / 1000 * 0.968).toFixed(1)}K</span>
                <span>{result3_2 / 1000}K</span>
                <span>-3.2%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>54%</span>
                    <span className='right'>46%</span>
                </div>
            </div>
        </div>
        if (category === 3 & method === 2 & startCalculation === true) return <div>
        <div className='scopes-container'>
            <div className='scopes'>
                <div className='top'>
                    <span>Scope 3 Emission:</span>
                    <div>
                        <span>{(result3_3 / 1000).toFixed(1)}K</span>
                        <span>KgCO2e</span>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='item'>
                        <span>Scope 1:</span>
                        <span>{(result3_3 / 1000 * 0.54).toFixed(1)}K</span>
                    </div>
                    <div className='item'>
                        <span>Scope 2:</span>
                        <span>{(result3_3 / 1000 * 0.46).toFixed(1)}K</span>
                    </div>
                </div>
            </div>
        </div>
        <span className='title_1'>Scope 3 YOY Performance:</span>
        <div className='performance'>
            <span>{(result3_3 / 1000 * 0.968).toFixed(1)}K</span>
            <span>{result3_3 / 1000}K</span>
            <span>-3.2%</span>
        </div>
        <span className='title'>Emission Source:</span>
        <div className='source-container'>
            <div className='source'>
                <span className='left'>54%</span>
                <span className='right'>46%</span>
            </div>
        </div>
    </div>
        else return <div>
            <div className='scopes-container'>
                <div className='scopes'>
                    <div className='top'>
                        <span>Scope 3 Emission:</span>
                        <div>
                            <span></span>
                            <span>KgCO2e</span>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='item'>
                            <span>Scope 1:</span>
                            <span></span>
                        </div>
                        <div className='item'>
                            <span>Scope 2:</span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <span className='title_1'>Scope 3 YOY Performance:</span>
            <div className='performance'>
                <span>000</span>
                <span>000</span>
                <span>0%</span>
            </div>
            <span className='title'>Emission Source:</span>
            <div className='source-container'>
                <div className='source'>
                    <span className='left'>0%</span>
                    <span className='right'>0%</span>
                </div>
            </div>
        </div>
    }
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
                            {displaycase()}
                            <div className='button'>Upload Data</div>
                        </div>
                    </div>
                    <div className='box'>
                        <span className='title'>Emission Overview</span>

                        {displayresult()}

                        {startCalculation ?
                            <div className='button red' onClick={() => { setStartCalculation(!startCalculation) }}>
                                Cancel Calculation
                            </div>
                            :
                            <div className='button' onClick={() => { setStartCalculation(!startCalculation) }}>
                                Start Calculation
                            </div>
                        }
                        <div className='button red' onClick={() => navigate('/display')} >Emission display</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CalculationPage