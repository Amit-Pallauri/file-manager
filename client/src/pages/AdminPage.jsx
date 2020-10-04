import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd';
import { Table } from 'antd';
import { verifyAdmins, getAllUnverifiedAdmins, getParticularUser, getAllUsers } from '../redux/actions/userActions'
import '../styles/admin.css'
import FileViewerPage from './FileViewerPage';

const AdminPage = () => {
    
    const dispatch = useDispatch()
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const unverifiedAdmins = useSelector(storeState => storeState.userState.unverifiedAdmins)
    const allUsers = useSelector(storeState => storeState.userState.allUsers)
    const particularUser = useSelector(storeState => storeState.userState.particularUser)

    useEffect(()=>{
        if(token){
            dispatch(getAllUsers())
            dispatch(getAllUnverifiedAdmins())
        }
    }, [])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
            title: 'Accept',
            dataIndex: 'accept',
        },
        {
            title: 'Reject',
            dataIndex: 'reject',
        },
      ];

    const handleClick = (status, userId) => {
        dispatch(verifyAdmins(status, userId))
    }

    const viewFilesHandleClick = (userId) => {
        dispatch(getParticularUser(userId))
    }
    
    let data = [];
    if(unverifiedAdmins ){
        unverifiedAdmins.map( (el, index) =>{
            data.unshift({
                key : index,
                name : el.name,
                email : el.email,
                accept : <button onClick={() => handleClick(true, el._id)}>Accept</button>,
                reject : <button onClick={() => handleClick(false, el._id)}>Reject</button>
            })
        })
    }
        
    const styleList = e => {
        e.style.background = 'red'
    }

    return (
        <div className='adminPage-container'>
            <section className="users-files-section">
                <div className='user-names'>
                    {
                        allUsers 
                        ?
                            <List
                                dataSource={allUsers}
                                bordered
                                renderItem={ item => (
                                    <List.Item
                                        key={item._id}
                                        actions={[
                                            <a onClick={ () => viewFilesHandleClick(item._id)}>
                                                View Files
                                            </a>
                                        ]}
                                    >
                                    <List.Item.Meta
                                        title={item.name}
                                    /></List.Item>                        
                                )}
                            /> 
                    : null 
                    }
                </div>
                <div className='user-files'>
                    {
                        particularUser 
                        ?
                            <FileViewerPage date={false} files={particularUser.files}/>
                        : null 
                    }
                </div>
            </section>
            <div style={{ borderRight : "1px solid rgba(136, 116, 116, 0.479)", height : "70vh", marginTop : "5%" }}></div>
            <section className='unverified-admins-section'>
                <p style={{textAlign : "center", fontSize : "20px", color :"red", fontWeight : 500}}>Unverified Admins</p>
                <div className='admin-requests'>
                    <Table pagination={{hideOnSinglePage: true}} columns={columns} dataSource={data} />
                </div>
            </section>
        </div>
    )
}

export default AdminPage