import React, {Component} from 'react';
import ProgressIndicator from './progressIndicator'
import './SearchFilter.css'
import './SkillsList.css'
import Toggle from './Toggle'

class SkillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      searchValue: "",
      filteredSkills: [],
      isChecked: true,
      isView: '',
    };
    this.filterByValue = this.filterByValue.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    // load our data and nest the skills
    this.props.data.then(data => {
      const skills = data.feed.entry
      console.log(skills)
      this.setState({
        skills: skills,
        filteredSkills: this.nestChildren(skills, 0),
      });
    });
  }

  nestChildren(arr, parentID) {
    const nestedSkills = []
    for (const item in arr) {
      // console.log('looking for', arr[item])
      // if there is no parent the child dissapears!! Todo: fixit
      if (parseInt(arr[item].gsx$parent.$t) === parentID) {
        let children = this.nestChildren(arr, parseInt(arr[item].gsx$id.$t))
        if (children.length && arr[item]) {
          arr[item].children = children
        }
        nestedSkills.push(arr[item])
      } else if (parseInt(arr[item].gsx$parent.$t) !== parentID){
        // console.log('looking for', arr[item])
      }
    }
    // console.log(nestedSkills)
    return nestedSkills
  }


  filterByValue(e) {
    //always pull in the promised array
    let filteredList = [...this.state.skills]
    // check that our value has length
    if (e.target.value.length) {
      filteredList = filteredList.filter(item => item.gsx$concept.$t.toLowerCase()
      .includes(e.target.value.toLowerCase()))
    }
    this.setState({
      searchValue: e.target.value,
      filteredSkills: this.nestChildren(filteredList, 0),
    });
  }

  handleToggle() {
    this.setState({
      isChecked: !this.state.isChecked,
      skills: this.nestChildren(this.state.skills, 0),
    });
  }

  render() {

    return (
      <div>
        <header className="header">
        <Toggle
          isChecked={this.state.isChecked}
          isView={this.state.isChecked === true ? "Progress" : "Roadmap"}
          handleToggle={this.handleToggle}/>
          <input
            type="text"
            className="search-filter"
            placeholder="Search for a skill to filter..."
            value={this.state.searchValue}
            onChange={this.filterByValue} />
        </header>
        { this.state.isChecked ? (
          <div className="roadmap__parent-skill-group">
            {this.state.filteredSkills.map(function (skill, index) {
              // console.log(skill.children)
              return <div className="roadmap__skill-group" key={index}>
                <div htmlFor="file" className="roadmap__concept">
                  {skill.gsx$concept.$t}</div>
                  {skill.children &&
                    <div className="roadmap__child-skill-group">{skill.children.map(function (childSkill, childindex) {
                      return <div className="roadmap__child-skill" key={childindex}>
                        <div className="roadmap__child-skill--concept">{childSkill.gsx$concept.$t}</div>
                        {childSkill.children &&
                          <div className="roadmap__grandchild-skill-group">
                          {childSkill.children.map(function(childSkill, childindex){
                            return <ul className="roadmap__grandchild-skill" key={childindex}><li className="roadmap__grandchild-skill--concept">{childSkill.gsx$concept.$t}</li>
                              </ul>
                            })}
                          </div>
                        }
                      </div>
                    })}
                    </div>
                  }
              </div>
            })}
          </div>
          ) : (
            <ul className="parent-skill-group">
              {this.state.filteredSkills.map(function (skill, index) {
                return <li className="skill-group" key={index}>
                  <ul>
                    <li className="label-group"><label htmlFor="file" className="concept">{skill.gsx$concept.$t}</label>
                      <li className="badges">
                        <ul className="achivement-group">
                          {skill.gsx$usedinlearning.$t === "1" && <li className="achivement usedinlearning"></li>}
                          {skill.gsx$pairprogramed.$t === "1" && <li className="achivement pairprogramed"></li>}
                          {skill.gsx$usedinproduction.$t === "1" && <li className="achivement usedinproduction"></li>}
                          {skill.gsx$debugged.$t === "1" && <li className="achivement debugged"></li>}
                          {skill.gsx$presentedonit.$t === "1" && <li className="achivement presentedonit"></li>}
                          {skill.gsx$taughtanother.$t === "1" && <li className="achivement taughtanother"></li>}
                          {skill.gsx$writtenblogarticle.$t === "1" && <li className="achivement writtenblogarticle"></li>}
                          {skill.gsx$yearsexp.$t === "1" && <li className="achivement yearsexp"></li>}
                          {skill.gsx$yearsexp_2.$t === "1" && <li className="achivement yearsexp_2"></li>}
                          {skill.gsx$yearsexp_3.$t === "1" && <li className="achivement yearsexp_3"></li>}
                          {skill.gsx$yearsexp_4.$t === "1" && <li className="achivement yearsexp_4"></li>}
                          {skill.gsx$yearsexp_2.$t === "1" && <li className="achivement yearsexp_2"></li>}
                        </ul>
                      </li>
                    </li>
                    <li>
                      <ProgressIndicator
                        id={skill.gsx$concept.$t}
                        value={skill.gsx$measure.$t}
                        goal={skill.gsx$goal.$t}>
                      </ProgressIndicator>
                    </li>
                    {skill.children &&
                      <ul className="child-skill-group">{skill.children.map(function (childSkill, childindex) {
                        return <li className="skill-group" key={childindex}>
                          <ul>
                            <label htmlFor="file" className="concept">{childSkill.gsx$concept.$t}</label>
                            <li>
                              <ProgressIndicator
                                id={childSkill.gsx$concept.$t}
                                value={childSkill.gsx$measure.$t}
                                goal={childSkill.gsx$goal.$t}>
                              </ProgressIndicator>
                            </li>
                          </ul>
                          {childSkill.children &&
                            <ul className="child-skill-group">{childSkill.children.map(function (childSkill, childindex) {
                              return <li className="skill-group" key={childindex}>
                                <ul>
                                  <label htmlFor="file" className="concept">{childSkill.gsx$concept.$t}</label>
                                  <li>
                                    <ProgressIndicator
                                      id={childSkill.gsx$concept.$t}
                                      value={childSkill.gsx$measure.$t}
                                      goal={childSkill.gsx$goal.$t}>
                                    </ProgressIndicator>
                                  </li>
                                </ul>
                              </li>
                            })}
                            </ul>
                          }
                        </li>
                      })}
                      </ul>
                    }
                  </ul>
                </li>
              })}
            </ul>
        )}
      </div>
    );
  }

}

export default SkillsList;
