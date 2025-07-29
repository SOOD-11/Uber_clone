import React from 'react'
const AcceptedRequestContext=React.createContext();
export const useAcceptedRequest=()=>React.useContext(AcceptedRequestContext);

export const AcceptedRequestProvider=({children})=>{
const [acceptedRequest,setAcceptedRequest]=React.useState(()=>{
     const stored = localStorage.getItem("AcceptedRequests");
    return stored ? JSON.parse(stored) : null;
});
return (

    <AcceptedRequestContext.Provider value={{acceptedRequest,setAcceptedRequest}}>
        {children}
    </AcceptedRequestContext.Provider>
);
};
