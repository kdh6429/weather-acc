import React from 'react'
import { HashRouter,Route, Link,Switch, Redirect, NavLink } from "react-router-dom";
import logo from './logo.svg'
import './App.scss'
import Main from './pages/Main';
import RegionDetail from './pages/RegionDetail';
import { REGIONS } from './constants/Region';
import { getRegionName } from './features/Util';
import About from './pages/About';

function App() {
  return (
    <div className="App">
    <div className="title">예보 정확도 리포트</div>
      <HashRouter>       
          <div className="nav">
            <div className="menu-side">
              <ul>
                <a href="#"><li><NavLink activeClassName='is-active' exact to="/about">About</NavLink></li></a>
                <a href="#"><li><NavLink activeClassName='is-active' exact to="/">요약 정보</NavLink></li></a>
                <li>지역 상세 정보</li>
                <div className="region-list">
                  { Object.keys(REGIONS).map( regionId => {
                        const rName = getRegionName(parseInt(regionId, 10));
                        return (<a  key={regionId} href="#"><li>
                          <NavLink activeClassName='is-active' to={`/r/${regionId}`}>
                            {rName}
                          </NavLink>
                        </li></a>)
                      })
                    }
                </div>
              </ul>
            </div>
            
            <div className="menu-top">
              <nav role="navigation">
                <div id="menuToggle">
                  <input type="checkbox" />
                  <span/>
                  <span/>
                  <span/>
                  <div className="title">예보 정확도 리포트</div>
                  <ul id="menu">
                    <a href="#"><li><NavLink activeClassName='is-active' exact to="/about">About</NavLink></li></a>
                    <a href="#"><li><NavLink activeClassName='is-active' exact to="/">요약 정보</NavLink></li></a>
                    <li>지역 상세 정보</li>
                    <div className="region-list">
                      { Object.keys(REGIONS).map( regionId => {
                            const rName = getRegionName(parseInt(regionId, 10));
                            return (<a  key={regionId} href="#"><li>
                              <NavLink activeClassName='is-active' to={`/r/${regionId}`}>
                                {rName}
                              </NavLink>
                            </li></a>)
                          })
                        }
                    </div>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/about" component={About}/>
              <Route path="/r/:id" component={RegionDetail}/>
              <Redirect path="*" to="/" />
            </Switch>
          </div>
      </HashRouter>
    </div>
  )
}

export default App
