import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';


export default function EveryIssue(props) {
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        let url = props.selectedIssue.comments_url;
        let respone = await fetch(url, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/vnd.github.mercy-preview+json'
            // },
        })
        let result = await respone.json()
        setComments (result)
    }
    useEffect(() => {
        fetchComments()
    }, [])
    console.log('selectedIssue', props.selectedIssue);

    return (
        <div>
            <h1>EveryIssue component</h1>
            <div>
                <p> number: {props.selectedIssue.number} + Title: {props.selectedIssue.title} </p>

                <p> State: {props.selectedIssue.state}</p>
                <div dangerouslySetInnerHTML={{ __html: props.selectedIssue.body }} />
                
                <p> Comment: {props.selectedIssue.comments} </p>

                
                
                {comments.map((item)=>{
                    return (
                    <div key={item.id} dangerouslySetInnerHTML={{ __html: item.body }} />
                    )
                })}



                {/* <Modal
                    isOpen={props.modalIsOpen}
                    onRequestClose={props.closeModal}
                    style={{ overlay: { display: "flex", justifyContent: "center" }, content: { width: "70%", height: "70%", position: "relative" } }}
                    contentLabel="Example Modal"
                >
                    <div onClick={() => props.openModal()}>
                        <p>{props.issues.number}</p>
                        <p> {props.issues.title}</p>

                    </div>
                </Modal> */}
            </div>
        </div>
    )
}
