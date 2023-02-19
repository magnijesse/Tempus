import React from "react";

const ClassSetup = (props) => {

    return (
        <>
            <h1>Setup a new class!</h1>

            <form>
                <input />    

                <button
                    onClick={() => {
                    post("/api/message", { content: messageText }).then(() => {
                        setMessageText("");
                    });
                    }}
                ></button>   
            </form>
        </>
    )

}

export default ClassSetup