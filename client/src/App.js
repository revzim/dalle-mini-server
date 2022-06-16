// import logo from './logo.svg';
import { useState, useEffect } from "react"
import * as axios from "axios"
import { Grid, Card, CardHeader, CardContent, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem, Box, Container, TextField, LinearProgress, Typography } from "@mui/material"

function App() {

  const [title, setTitle] = useState("dalle-client | revzim")

  const [subHeader, setSubHeader] = useState("AI generated images from text")

  const [loading, setLoading] = useState(false)

  const [imgText, setImgText] = useState("")

  const [imgVals, setImgVals] = useState([])

  const [imgCount, setImgCount] = useState(1)

  const [queueStartTime, setQueueStartTime] = useState(null)

  // const [timeNow, setTimeNow] = useState()

  // const loadTimeDuration = () => {
  //   const duration = Date.now() - queueStartTime
  //   return parseInt(duration / 1000)
  // }

  // useEffect(() => {

  // }, [])

  const getLoadTimeHelperText = () => {
    const str = `generating ${imgCount} images can take up to ${parseInt(imgCount * 70 / 60) + 1} minutes or longer. (hardware dependent)` // time in queue: ${loadTimeDuration()} seconds`
    return (
      <Typography sx={{}}>{str}</Typography>
    )
  }

  const handleOnChangeImgText = (e) => {
    e.preventDefault()
    const val = e.target.value
    setImgText(val)
    if (val === "") {
      setSubHeader("built on top of dalle-mini")
    }
  }

  const handleImgCountChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    // console.log(val)
    setImgCount(parseInt(val))
  }

  const queryImg = async (e) =>  {
    e.preventDefault()
    setImgVals([])
    if (imgCount <= 0) return
    setQueueStartTime(Date.now())
    setSubHeader(`generating images for: ${imgText}...`)
    setLoading(true)
    try {
      const uri = `http://${window.location.hostname}:8080/dalleg?num_images=${imgCount}&text=${encodeURI(imgText)}`
      // console.log(`attempting to query ${uri} | please wait...`)
      const resp = await axios.get(uri)
      // console.log(resp)
      const data = resp.data
      setImgVals(data)
      setSubHeader(`generated images for: ${imgText}`)
      setQueueStartTime(null)
      setLoading(false)
    } catch (e) {
      console.log("queryImg err", e)
      setSubHeader("error querying backend for response")
      setLoading(false)
    }
  }

  const getRenderContent = (arr) => {
    return arr.map((val) => {
      const imgPrepend = "data:image/jpeg;base64,"
      const localImgSrc = `${imgPrepend}${val}`
      return (
        <ImageListItem style={{ listStyle: "none",  }} key={val}><img width={window.innerWidth < 800 ? "100%" : "50%"} src={localImgSrc} className="App-logo" alt="logo" /></ImageListItem>
      )
    })
  }
  
  const getDalleImgTextForm = () => {
    return (
      <Box component="form" noValidate autoComplete="off" onSubmit={queryImg}>
        <TextField fullWidth label={"Enter an image idea"} disabled={loading} name="img_name" value={imgText} onChange={handleOnChangeImgText} />
      </Box>
    )
  }

  const getDalleImgCountForm = () => {
    return (
      <FormControl disabled={loading} required sx={{ width: "100%" }}>
        <InputLabel id="img-count-label"># of images to generate</InputLabel>
        <Select
          autoWidth
          labelId="img-count"
          id="img_count"
          value={imgCount}
          label="# of images to generate"
          onChange={handleImgCountChange}>
          { 
            new Array(9).fill(null).map((x, i) => i + 1).map((val, arrIdx) => {
              return <MenuItem sx={{ alignSelf: "center" }} value={val} key={val + 'i'}>{val}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    )
  }

  return (
    <Card>
      <CardHeader title={title} subheader={subHeader} />
      {/* <Box component="form"
        noValidate
        autoComplete="off"
        onSubmit={queryImg}> */}
        <Grid container spacing={2} direction="row" alignItems="center" >
          <Grid item xs={9}>
            { getDalleImgTextForm() }
          </Grid >
          <Grid item xs={3} sx={{  }}>
            { getDalleImgCountForm() }
          </Grid>
        </Grid>
      {/* </Box> */}
      <CardContent>
        {
          loading ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
              { getLoadTimeHelperText() }
            </Box>
          ) : imgVals.length > 0 ? (
            // <Container style={{ height: "80vh", overflowY: "auto", width: "100%" }}>
            <Container style={{ height: "100%", overflowY: "auto", width: "100%" }}>
              <ImageList /*cols={3} rowHeight={250}*/ >
                { getRenderContent(imgVals) }
              </ImageList>
            </Container>
          ) : null
        }
      </CardContent>
    </Card>
    // <div className="App">
    //   <header className="App-header">
    //     <h5 style={{ wordWrap: "auto", maxWidth: "50vw" }} >{title}</h5>
    //     {
    //       imgVals.length > 0 ? (
    //         <>
    //           <div style={{ height: "50vh", overflowY: "auto", width: "100%"  }}>
    //             <ul style={{}}>
    //               {getRenderContent(imgVals)}
    //             </ul>
    //           </div>
    //         </>
    //       ) : null
    //     }
    //     <form onSubmit={queryImg}>
    //       <input disabled={loading} name="img_name" type="text" value={imgText} onChange={handleOnChangeImgText} />
    //     </form>
    //   </header>
    // </div>
  );
}

export default App;
