import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
const ReactMarkdown = require('react-markdown/with-html')


export default function EveryIssue(props) {

    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading,setLoading] = useState (false);

    const fetchComments = async () => {
        let url = props.selectedIssue.comments_url;
        let respone = await fetch(url, {
            method: 'GET',

        })
        let result = await respone.json()
        setComments(result)
    }
    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div>
            <h1>EveryIssue component</h1>
            <div>
                <p> number: {props.selectedIssue.number} + Title: {props.selectedIssue.title} </p>

                <p> State: {props.selectedIssue.state}</p>

                <ReactMarkdown
                    source={props.selectedIssue.body}
                    escapeHtml={false}
                />

                <input value={newCommentText} onChange={(event) => {
                    setNewCommentText(event.target.value)
                }} />
                <button onClick={async () => {
                    setLoading (true);

                    let url = props.selectedIssue.comments_url;
                    let respone = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`

                        },

                        body: JSON.stringify({ body: newCommentText })

                    })
                    let result = await respone.json()

                    setTimeout(()=>{
                        fetchComments().then(()=>{
                            setLoading(false)
                        })
                    },3000)
                }}> Add New Comment </button>
                <button onClick={()=>{
                    setLoading(true);
                    fetchComments().then(()=>{
                        setLoading(false)
                    })
                }}> Reload Comment </button>
                <p> Comment: {props.selectedIssue.comments} </p>
                {loading?"loading...":comments.map((item) => {

                    return (

                        <div style={{ border: "2px solid black" }} key={item.id}>
                            <ReactMarkdown
                                source={item.body}
                                escapeHtml={false}
                            />
                        </div>

                    )
                })}

            </div>
        </div>
    )
}
