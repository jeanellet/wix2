import React, { useEffect, useState} from 'react';
import axios from 'axios';
import CsvDownload from 'react-json-to-csv';

function DataDisplay(props){
    const [mydata,setData] = useState(null);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        console.log("called effect");
        getData();
    }, []);

    async function getData(){
        await axios.get(`https://wix-server.herokuapp.com/`)
        .then(res => {
            console.log("res", res);
            console.log("res.data", res.data);
    
            setData(res.data);

            
        });
    };

    return (
        <div>
            {mydata && mydata.map(user => <CsvDownload data={user.rows}/>)}
        </div>
    );
};

export default DataDisplay;