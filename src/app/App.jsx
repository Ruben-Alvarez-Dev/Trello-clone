import './App.css'
import { initData } from '../helper/InitData'

export const App = () => {

  const data = initData();
  /* console.log(data); */

  return (
    
      <div className="app">
        {
          data.lists.map(list => {
            return (
              <div key={list.id} className="list">
                <h2>{list.title}</h2>
                  <div>
                    {
                      list.value.map(value => {
                        return (
                          <div key={value} className="task">
                            <p>{data.tasks.find(task => 
                              task.id === value).value}
                            </p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
      </div>
  )
}
