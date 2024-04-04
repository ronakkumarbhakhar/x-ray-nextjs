'use client';

import { useEffect,useLayoutEffect,useRef,useState } from "react";
import Header from "../Header/Header";
import './Template.css'
import Keypoints from "../Keypoints/Keypoints";
import Rating from "../Rating/Rating";
import Footer from "../Footer/Footer";
import Explore from "../Explore/Explore";
import { useDispatch} from "react-redux";
import { pushElement } from "../../../../../lib/Store/mainReducer";
export default function Template(props){
    const dispatch=useDispatch();

    const[state,setState]=useState({})
    const[exploreState,setExploreState]=useState(false)
    const[stateUpdated,setStateUpdated]=useState(false)
   
    const templateRef = useRef(null);
    const headerRef = useRef(null);
    const exploreRef = useRef(null);

    let score=0;
    const current_analysis=[];
    const scope_of_improvement=[];
    const expert_suggestions={uncategorised:[],categorised:{}};
    const explore={};
   
    if('health_check_summary_table' in props.data){
        props.data.health_check_summary_table.map((d)=>{if(d.category==props.children){
            if(d.summary_type=="GOOD" && d.short_summary!=""){
                current_analysis.push(d.short_summary);
            }
            else if(d.summary_type=="BAD" && d.short_summary!=""){
                scope_of_improvement.push(d.short_summary);
            }
            if('detailed_summary' in d){
                if(d.sub_category!=""){
                    if(d.sub_category in expert_suggestions.categorised){
                        expert_suggestions.categorised[d.sub_category]=[...expert_suggestions.categorised[d.sub_category],d.detailed_summary];
                    }else{
                        expert_suggestions.categorised[d.sub_category]=[d.detailed_summary];
                    }
                }else{
                    expert_suggestions.uncategorised.push(d.detailed_summary);
                }
            }
            if('related_article_url' in d && 'related_article_heading' in d){
                explore[d.related_article_url]=d.related_article_heading;
            }
        }})
    
        props.data.health_check_score_table.map((d)=>{if(d.category==props.children){
            score=d.score;
        }})
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
            dispatch(
                pushElement({
                    category:props.children.toString() ,
                    element:{...dic},
                })
            ) 
        }
        if(exploreState && stateUpdated==false){
            dispatch(
                pushElement({
                    category:props.children.toString() ,
                    element:{...dic},
                })
            ) 
        }
    },[stateUpdated,exploreState])

    useLayoutEffect(()=>{
        crossing(templateRef,exploreRef);
    },[])

    return (
        <div ref={templateRef} className="Template">
            <Header ref={headerRef}>{props.children}</Header>
            <Rating score={score} category={props.children}></Rating>
            <Keypoints parentState={{setState,setStateUpdated}} current_analysis={current_analysis} scope_of_improvement={scope_of_improvement} expert_suggestions={expert_suggestions} category={props.children}></Keypoints>
            <Explore ref={exploreRef} explore={explore}></Explore>
            <Footer pageNo={props.pageNo}></Footer>
        </div>
    )
}

