import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import FormField from '../components/FormField'
import InputField from '../components/InputField'
import Loading from '../components/Loading'
import AdminPage from '../pages/AdminPage'
import { getUser, uploadFiles } from '../redux/actions/userActions'
import '../styles/homepage.css'
import FileViewerPage from './FileViewerPage'
import { SearchOutlined } from '@ant-design/icons'
import Fuse from 'fuse.js'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const HomePage = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [files, setFile] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        if(token){
            dispatch(getUser())
        }
    }, [])

    const user = useSelector( storeState => storeState.userState.user )
    const loader = useSelector(storeState => storeState.userState.loader)
    
    let fuse = ""

    if(user && user.files){
        fuse = new Fuse( user.files, {
            keys : [
                'fileName'
            ]
        })
    }

    const results = fuse.search(searchValue)
    
    const handleChange = e => {
        setFile(e.target.files)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData();
        for(var i=0; i< files.length; i++){
            console.log(files[i])
            formData.append('files', files[i])
        }
        dispatch(uploadFiles(formData))
    }

    const handleSearch = e =>{
        e.preventDefault()
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return (
        <div className="homePage-container">
            {
                token
                    ? 
                        token && user && user.type == 'user'
                            ?
                                <div className='file-section'>
                                    <section className='file-upload-section'>
                                        <div className='file-upload'>
                                            <FormField onSubmit={handleSubmit}>
                                                {
                                                    loader && <Spin className="spinner" indicator={antIcon} />
                                                }
                                                <InputField
                                                    type="file"
                                                    onChange={handleChange}
                                                    multiple
                                                />
                                                <InputField 
                                                    type='submit'
                                                    value='upload'
                                                />
                                            </FormField>
                                        </div>
                                        <div className='file-search'>
                                            <FormField onSubmit={handleSearch}>
                                                <InputField 
                                                    type='text'
                                                    name='search'
                                                    value={searchValue}
                                                    placeholder='search your file here'
                                                    style={{ textAlign : 'center'}}
                                                    onChange={e => setSearchValue(e.target.value)}
                                                />
                                                <button type='submit' ><SearchOutlined style={{ fontSize : '25px' }} /></button>
                                            </FormField>
                                        </div>
                                    </section>
                                    <section className='file-viewer-section'>
                                        <FileViewerPage date={true} files={user.files} searchResults={results}/>
                                    </section>            
                                </div>
                            : (user && user.type == 'admin') 
                                ?
                                    <AdminPage/>
                                :  <Loading/>                    
                : 
                <main class="measure center tc sans-serif black-80 absolute absolute--fill">
                   <div class="flex flex-column justify-center items-center h-100">
                    <header>
                        <h1 class="animated fadeInUp ease-out-circ d2 a-1 f2 fw3">
                        <code class="db black-40" style={{ width : '500px' }}>'Welcome To FilemanageR'</code>
                        </h1>
                        <h2 class="animated fadeInUp ease-out-circ d-1 a-2 f6">
                        Register yourself to enjoy <span class="nowrap">our services</span>
                        </h2>
                    </header>
                    </div>
                </main>
            }
            
        </div>
    )
}

export default HomePage
