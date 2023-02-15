import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Row, Button } from 'react-bootstrap'

function Review() {
  const location = useLocation()
  const [activity, setActivity] = useState('');
  const [listData, setlistData] = useState([])

  function addActivity() {
    setlistData((listData) => {
      const updatedList = [...listData, activity]
      console.log(updatedList)
      setActivity('');
      return updatedList
    })
  }
  
  function removeActivity(i) {
    const updatedListData = listData.filter((ele, id) => {
      return i != id
    })
    setlistData(updatedListData);
  }
  
  function removeAll() {
    setlistData([])
  }

  return (
    <>
      <div className='revContainer'>
        <Row md={2} xs={1} lg={3}>
          <Card className="h-100 ">
            <Card.Img
              variant='top'
              src={location.state.img}
              height="400px"

              style={{ objectFit: "cover" }}
            />
          </Card>
          <div className='textarea'>

            <textarea rows="7" cols='100' value={activity} onChange={(e) => setActivity(e.target.value)}>

            </textarea>
            <Button className='revbtn' onClick={addActivity}> Post </Button>
          </div>
          <div >

            {listData != [] && listData.map((data, i) => {
              return (
                <>
                  <p key={i} >
                    <div >{data}</div>
                    <Button onClick={() => removeActivity(i)}>Delete</Button>
                  </p>
                </>
              )
            })}
            {listData.length >= 1 && <Button onClick={removeAll}>Delete All</Button>}
          </div>

        </Row>
      </div>
    </>
  )
}

export default Review