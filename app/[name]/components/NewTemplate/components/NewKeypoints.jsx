'use client';

import {createRef,useRef,useLayoutEffect} from "react";
import "./NewKeypoints.css"
function NewKeypoints(props) {
    const crossingData={}
    
    const keypointsRef = useRef(null);
    const currentAnalysisHeaderRef=useRef(null);
    const scopeOfImprovementHeaderRef =useRef(null);
    const expertSuggestionHeaderRef =useRef(null);

    const currentAnalysisRef=[];
    const scopeOfImprovementRef =[];
    const expertSuggestionRef ={categorised:[],uncategorised:[]};

    let scopeOfImrpovementHtml;
    let expertsuggestionsHtml;
    let noneHtml;

    if(props.scope_of_improvement.length!=0){
        scopeOfImrpovementHtml=<>
        <div  className="content-heading">
            Scope for Improvement
        </div>
        <ul className="content">
            {props.scope_of_improvement.map((data,index)=>{ scopeOfImprovementRef.push(createRef(null)); return ( <li ref={scopeOfImprovementRef[index]} key={'improvement'+index}> {data}</li>)})}
        </ul></>
    }

    if(Object.keys(props.expert_suggestions.categorised).length!=0 || props.expert_suggestions.uncategorised.length!=0){
       expertsuggestionsHtml= <>
            <div  className="content-heading">
                Expert Suggestions
            </div>
            <ul className="content">
            {props.expert_suggestions.uncategorised.map((key,index)=>{ expertSuggestionRef.uncategorised.push(createRef(null)); return ( <li ref={expertSuggestionRef.uncategorised[index]} key={'uncategorised-suggestions'+index}>{key.toString()}</li>)})}
            </ul>
            <ul className="content">
            { Object.keys(props.expert_suggestions.categorised).map((key,i)=>{
                    expertSuggestionRef.categorised.push(createRef(null))
                    return (
                        <li ref={expertSuggestionRef.categorised[i]} key={"subcategory"+i} className="expertSuggestions-subcategory">
                            <p className="expertSuggestions-subcategory-heading">
                                {key}
                            </p>
                            <ul>   
                                {props.expert_suggestions.categorised[key].map((data,index)=>{ 
                                        return (
                                            <p key={"subcategory"+index+"content"}>
                                                {data}
                                            </p>
                                        )
                                    }) 
                                }
                            </ul>
                        </li>
                    )
                }) 
            }
            </ul>
        </>
    }

    if(Object.keys(props.none_expert_suggestions.categorised).length!=0 || props.none_expert_suggestions.uncategorised.length!=0){
        expertsuggestionsHtml=<>
            <div  className="content-heading">
            </div>
            <ul className="content">
            {props.none_expert_suggestions.uncategorised.map((data,index)=>{ expertSuggestionRef.uncategorised.push(createRef(null)); return ( <li ref={expertSuggestionRef.uncategorised[index]} key={'uncategorised-suggestions'+index}> {data.toString()}</li>)})}
            </ul>
            <ul className="content">
            { Object.keys(props.none_expert_suggestions.categorised).map((key,i)=>{
                    expertSuggestionRef.categorised.push(createRef(null))
                    return (
                        <li ref={expertSuggestionRef.categorised[i]} key={"subcategory"+i} className="expertSuggestions-subcategory">
                            <p className="expertSuggestions-subcategory-heading">
                                {key}
                            </p>
                            <ul>   
                                {props.none_expert_suggestions.categorised[key].map((data,index)=>{ 
                                        return (
                                            <p key={"subcategory"+index+"content"}>
                                                {data}
                                            </p>
                                        )
                                    }) 
                                }
                            </ul>
                        </li>
                    )
                }) 
            }
            </ul>
        </>
    }

    useLayoutEffect(()=>{
        // ref.current=keypointsRef.current;
        if(currentAnalysisHeaderRef.current.getBoundingClientRect().top+20>keypointsRef.current.getBoundingClientRect().bottom || currentAnalysisHeaderRef.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
            scopeOfImprovementHeaderRef.current.remove();
            expertSuggestionHeaderRef.current.remove();
            crossingData['scopeOfImprovement']={...props.scope_of_improvement};
            crossingData['expertSuggestion']={...props.expert_suggestions};
            if(currentAnalysisHeaderRef.current.getBoundingClientRect().top+20>keypointsRef.current.getBoundingClientRect().bottom){
                crossingData['currentAnalysis']=[...props.current_analysis];
                currentAnalysisHeaderRef.current.remove();
                props.parentState.setState({...crossingData});
                props.parentState.setStateUpdated(true)
            }
            else{
                crossingData['none']=[];
                currentAnalysisRef.forEach((key)=>{
                    if(key.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
                        crossingData['none'].push(key.current.childNodes[1].data);
                        key.current.remove();
                        props.parentState.setState({...crossingData});
                        props.parentState.setStateUpdated(true)
                    }
                })
            }
            
        }else if(scopeOfImprovementHeaderRef.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom || scopeOfImprovementHeaderRef.current.getBoundingClientRect().top +20>keypointsRef.current.getBoundingClientRect().bottom){
            
            expertSuggestionHeaderRef.current.remove();
            crossingData['expertSuggestion']={...props.expert_suggestions};

            if(scopeOfImprovementHeaderRef.current.getBoundingClientRect().top+20>keypointsRef.current.getBoundingClientRect().bottom){
                crossingData["scopeOfImprovement"]=[...props.scope_of_improvement];
                expertSuggestionHeaderRef.current.remove();
                props.parentState.setState({...crossingData});
                props.parentState.setStateUpdated(true)

            }else{
                crossingData['none']=[];
                scopeOfImprovementRef.forEach((key)=>{
                    if(key.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
                        crossingData['none'].push(key.current.childNodes[1].data);
                        key.current.remove();
                        props.parentState.setState({...crossingData});
                        props.parentState.setStateUpdated(true)
                    }
                })
            }
            
        }else if(expertSuggestionHeaderRef.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom || expertSuggestionHeaderRef.current.getBoundingClientRect().top>keypointsRef.current.getBoundingClientRect().bottom){
            
            if(expertSuggestionHeaderRef.current.getBoundingClientRect().top+20>keypointsRef.current.getBoundingClientRect().bottom){
                crossingData['expertSuggestions']=[...props.expert_suggestions];
                expertSuggestionHeaderRef.current.remove();
                props.parentState.setState({...crossingData});
                props.parentState.setStateUpdated(true)

            }
            else{
                let noneExpertSuggestions={uncategorised:[],categorised:{}}
                let bool=true;
                delete crossingData.none;
                expertSuggestionRef.uncategorised.forEach((key)=>{
                    if(key.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
                        noneExpertSuggestions.uncategorised.push(key.current.childNodes[1].data);
                        bool=false;
                        noneExpertSuggestions.categorised={...props.expert_suggestions.categorised};
                        crossingData['none-expertSuggestions']={...noneExpertSuggestions};
                        props.parentState.setState({...crossingData});
                        props.parentState.setStateUpdated(true)
                        key.current.remove();
                    }
                })
                if(bool){
                   
                    expertSuggestionRef.categorised.forEach((key)=>{
                            if(key.current.getBoundingClientRect().top+20>keypointsRef.current.getBoundingClientRect().bottom){
                                let arr=[];
                                key.current.childNodes[1].childNodes.forEach((key)=>{
                                    arr.push(key.childNodes[0].data);
                                })
                                noneExpertSuggestions.categorised[key.current.childNodes[0].childNodes[0].data]=[...arr];
                                crossingData['none-expertSuggestions']={...noneExpertSuggestions};
                                props.parentState.setState({...crossingData});
                                props.parentState.setStateUpdated(true)
                                key.current.remove();
                            }
                        })
                        expertSuggestionRef.categorised.forEach((key)=>{
                            if(key.current.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
                                let arr=[];
                                key.current.childNodes[1].childNodes.forEach((key)=>{
                                    if(key.getBoundingClientRect().bottom>keypointsRef.current.getBoundingClientRect().bottom){
                                        noneExpertSuggestions.uncategorised.push(key.childNodes[0].data);
                                        key.remove();
                                    }
                                })
                                crossingData['none-expertSuggestions']={...noneExpertSuggestions};
                                props.parentState.setState({...crossingData});
                                props.parentState.setStateUpdated(true)
                            }
                    })
                }
            }
        }
    },[])
    
    // <section ref={keypointsRef} style={{maxHeight:props.parentState.setState.height}} className="Keypoints">

    return (
        <section ref={keypointsRef} className="NewKeypoints">
            <div ref={currentAnalysisHeaderRef} className="content-container">
            {props.current_analysis.length>0?(
                <>
                    <div  className="content-heading">
                    
                    </div>
                    <ul className="content">
                    {props.current_analysis.map((data,index)=>{ currentAnalysisRef.push(createRef(null)); return ( <li ref={currentAnalysisRef[index]} key={'analysis'+index}> {data}</li>)})}
                    </ul>
                </>
            ):""}
            </div>

            <div ref={scopeOfImprovementHeaderRef} className="content-container">
                {scopeOfImrpovementHtml}
            </div>

            <div ref={expertSuggestionHeaderRef} className="content-container">
               {expertsuggestionsHtml}
            </div>

        </section>
    );
}

export default NewKeypoints;