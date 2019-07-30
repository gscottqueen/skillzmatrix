import React, {Component} from 'react';
import ProgressIndicator from './progressIndicator'
import './SearchFilter.css'

class SkillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsJson: props.data,
      skills: [],
      searchValue: "",
      filteredSkills: [],
    };
    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  getCurrentValue(e) {
    var filteredList = this.state.skills;
      filteredList = filteredList.filter(function (item) {
        console.log(item)
        return item.gsx$concept.$t.toLowerCase().indexOf(
          e.target.value.toLowerCase()) !== -1;
      });

    this.setState({
      searchValue: e.target.value,
      filteredSkills: filteredList,
    });
  }

  componentWillMount() {
    this.state.skillsJson.then(data => {

      const skillSet = data.feed.entry
      const SKILLS = getNestedChildren(skillSet, "0")

      function getNestedChildren(arr, parent) {
        var orderedSkills = []
        for (var i in arr) {
          if (arr[i].gsx$parent.$t === parent) {
            var children = getNestedChildren(arr, arr[i].gsx$id.$t)

            if (children.length) {
              arr[i].children = children
            }
            orderedSkills.push(arr[i])
          }
        }
        return orderedSkills
      }

      getNestedChildren(skillSet, "0")

      this.setState({
        skills: skillSet,
        filteredSkills: SKILLS,
      })
    });
  }

  render() {

    return (
      <div>
        <div>
          <input
            type="text"
            className="search-filter"
            placeholder="Search for a skill to filter..."
            value={this.state.searchValue}
            onChange={this.getCurrentValue} />
        </div>
        <ul className="parent-skill-group">
          {this.state.filteredSkills.map(function(skill, index) {
            return <li className="skill-group" key={index}>
              <ul>
                <label htmlFor="file" className="concept">{skill.gsx$concept.$t}</label>
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
                        <label htmlFor="file" className="concept">{ childSkill.gsx$concept.$t }</label>
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
              </ul>
            </li>
          })}
        </ul>
      </div>
    );
  }

}

export default SkillsList;
