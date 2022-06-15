import React, { useState, useEffect, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//^ axios for api calling && we can call fetch api by script
import axios from 'axios';
import { questionnaireRoute } from "../../utils/APIRoutes";
import './Questionnaire.css';
import Main from './Main.jpg';
import { localUser } from "../../utils/APIRoutes";

//let hobbies = [];
export default class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Hobby: [
                { id: 1, value: "Cricket", },
                { id: 2, value: "Football" },
                { id: 3, value: "Kayaking" },
                { id: 4, value: "Swimming" },
                { id: 5, value: "Badminton" },
                { id: 6, value: "Ski" },
                { id: 7, value: "Dancing" },
                { id: 8, value: "Cooking" },
                { id: 9, value: "Reading" },
                { id: 10, value: "Socializing" },
                { id: 11, value: "Hiking" },
                { id: 12, value: "Cycling" },
            ],
            checkedItems: new Map(),
            
        }
        this.ChangeHobby = this.ChangeHobby.bind(this);
        this.getCheckboxesValue = this.getCheckboxesValue.bind(this);
        
     //   this.setCheckboxValueSelected = this.setCheckboxValueSelected.bind(this);
        
    }
    ChangeHobby(event) {
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(event.target.value, event.target.checked) }));
    }

    getCheckboxesValue() {
        let userName;
        let value = "";
        this.state.checkedItems.forEach((hobbyinfo, index) => {
            if (hobbyinfo) {
                value = value == "" ? index : value + "," + index;
            }
        })
        console.log(typeof(value));
        const savedToken = localStorage.getItem("chatapp-user");
                axios.post(localUser, {
                    savedToken
                }).then(response=>{console.log(response.data.username);
                    userName = response.data.username;
                        axios.post(`${questionnaireRoute}`, {value, userName}).then(reply=>{console.log(reply);
                        window.location.replace("http://localhost:3000/ProfileHome");
                        } )
                    })
            
            }

    render() {
        return (
           
            <section className="content-wrapper">
                <div className="container-fluid " style={{marginTop:"7rem"}}>
                <h2 className="hobbiesHeader">Please select some of your interests!!</h2>
                    <div className="interests">
                        {
                            this.state.Hobby.map(item => (

                                    <label className="hobbies">
                                        <input className="hobbiesInput" type="checkbox" value={item.value} onChange={this.ChangeHobby} checked={this.state.checkedItems.get(item.value)} />
                                        {item.value}
                                    </label>

                            ))
                        }

                    </div>
                    <div className="row col-md-12 ml-2">
                        <button  type="button" className="hobbies-btn" onClick={this.getCheckboxesValue}>Submit</button>
                    </div>
                </div>
            </section>

        )
    }
}