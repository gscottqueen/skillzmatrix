import React, {Component} from 'react';
import ProgressIndicator from './progressIndicator'

class SkillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsJson: props.data,
      skills: [],
    };
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
        // console.log("orderedSkills", orderedSkills)
        return orderedSkills
      }

      getNestedChildren(skillSet, "0")
      console.log(SKILLS)

      this.setState({
        skills: SKILLS,
      })
    });
  }

  render() {

    return (
      <ul className="parent-skill-group">
        {this.state.skills.map(function(skill, index) {
          console.log(skill.children)
          return <li className="skill-group" key={index}>
            <ul>
              <label for="file" className="concept">{skill.gsx$concept.$t}</label>
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
                      <label for="file" className="concept">{ childSkill.gsx$concept.$t }</label>
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
    );
  }

}

export default SkillsList;
