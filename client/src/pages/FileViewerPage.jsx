import React from 'react'
import { Table } from 'antd';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'

const FileViewerPage = (props) => {
  
  if(props.date == true){
    var columns = [
      {
        title: 'Date created',
        dataIndex: 'createdAt'
      },
      {
        title: 'Files',
        dataIndex: 'file',
      }
    ];
  }else{
    var columns = [
        {
          title: 'Files',
          dataIndex: 'file',
        }
    ];
  }

    let files = props.searchResults && props.searchResults.length !== 0 ? props.searchResults : props.files
    let data = [];
    let date = ''
    files.map( (el, index) =>{
      const elem = el.item ? el.item : el
      date = elem.createdAt
      data.unshift({
          key : index,
          createdAt : `${new Date(date).toLocaleDateString()}, ${new Date(date).toLocaleTimeString()}`,
          file : <a href={elem.file} download>{elem.fileName}</a>
      })
  })

    return <Table pagination={{hideOnSinglePage: true}} columns={columns} dataSource={data} />;
}

export default FileViewerPage
