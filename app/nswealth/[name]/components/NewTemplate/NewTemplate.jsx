'use client';

import { useEffect,useRef,useState } from "react";
import { useDispatch} from "react-redux";
import './NewTemplate.css'
import Header from "../Header/Header";
import NewKeypoints from "./components/NewKeypoints";
import Explore from "../Explore/Explore";
import Footer from "../Footer/Footer";
import { pushElement } from"../../../../../lib/Store/mainReducer";


export default function NewTemplate(props){

    const dispatch=useDispatch();

    const[state,setState]=useState({})
    const[exploreState,setExploreState]=useState(false)
    const[stateUpdated,setStateUpdated]=useState(false)
   
    const templateRef = useRef(null);
    const headerRef = useRef(null);
    const exploreRef = useRef(null);

    let none=[];
    let scope_of_improvement=[];
    let expert_suggestions={uncategorised:[],categorised:{}};
    let none_expert_suggestions={uncategorised:[],categorised:{}};
    const explore={...props.data.Explore};

    let newKeypoint;
    

    if("Keypoints" in props.data){
        if("none" in props.data.Keypoints){
            none=[...props.data.Keypoints.none]
        }
        if("ScopeOfImprovement" in props.data.Keypoints){
            scope_of_improvement=[...props.data.Keypoints.scopeOfImprovement]
        }
        if("expertSuggestion" in props.data.Keypoints){
            expert_suggestions={...props.data.Keypoints.expertSuggestion}
        }
        else if("none-expertSuggestions" in props.data.Keypoints){
            none_expert_suggestions={...props.data.Keypoints["none-expertSuggestions"]}
        }

        newKeypoint=<NewKeypoints parentState={{setState,setStateUpdated}} current_analysis={none} scope_of_improvement={scope_of_improvement} expert_suggestions={expert_suggestions} none_expert_suggestions={none_expert_suggestions} category={props.children}></NewKeypoints>

    }
    function crossing(parentRef,childRef){
        if(parentRef.current.getBoundingClientRect().bottom<childRef.current.getBoundingClientRect().bottom){
            if(childRef.current.classList[0]=="Explore"){
                setExploreState(true);
                childRef.current.remove();
            }
        }
    }

   
    useEffect(()=>{
        let dic={};
        if(exploreState){
            dic.Explore={...explore};
        }
        if(stateUpdated){

            dic.Keypoints={...state}
            setState({})
            dispatch(
                pushElement({
                    category:props.children.toString() ,
                    element:{...dic},
                })
            ) 
        }if(exploreState && stateUpdated==false){
            dispatch(
                pushElement({
                    category:props.children.toString() ,
                    element:{...dic},
                })
            ) 
        }
    },[stateUpdated,exploreState])

    useEffect(()=>{
        crossing(templateRef,exploreRef);
    },[])

    return (
        <div ref={templateRef} className="Template">
            <Header ref={headerRef}>{props.children}</Header>
            {newKeypoint}
            <Explore ref={exploreRef} explore={explore}></Explore>
            <Footer pageNo={props.pageNo}></Footer>
        </div>
    )
}

