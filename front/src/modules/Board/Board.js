import React from 'react';
import './Board.css'
import Navbar from "./components/navbar/navbar";

const Board = () => {

    return (
        <div>
            <div className="container">
                <div className="content">

                    <section className="main-content">
                        <div className="app">
                            <div className="fab-icon"> +</div>
                            <Navbar/>

                            <section className="app-content">

                                <header>
                                    <div className="searchbox">
                                        <div className="icon"><i className="fa fa-search" aria-hidden="true"></i></div>
                                        <input type="text" name="search" placeholder="Search a project"
                                               className="search-text"/>
                                    </div>

                                    <div className="app-list-options">
                                        <div className="display-group">
                                            <div className="icon"><i className="fa fa-bars" aria-hidden="true"></i>
                                            </div>
                                            <div className="icon selected"><i className="fa fa-th"
                                                                              aria-hidden="true"></i></div>
                                        </div>
                                    </div>

                                </header>

                                <ul className="projects">
                                    <li className="project-item">
                                        <div className="logo-row"><img src="https://source.unsplash.com/48x48/?brands"
                                                                       alt="Image 001"/>
                                            <div className="icon"><i className="fa fa-ellipsis-h icon"
                                                                     aria-hidden="true"></i></div>
                                        </div>
                                        <div className="title-row">
                                            <h3> Sports Interactive </h3>
                                            <div className="links"><i className="fa fa-external-link icon"
                                                                      aria-hidden="true"></i> <a
                                                href="#"> sportsinteractive.com </a></div>
                                        </div>
                                        <div className="desc-row">
                                            <p> Web resource which contains all about transfer in the world of
                                                sports</p>
                                        </div>

                                        <div className="footer-row">
                                            <div className="days danger"><i className="fa fa-clock-o icon"
                                                                            aria-hidden="true"></i> 2 days left
                                            </div>
                                        </div>
                                    </li>


                                </ul>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Board;