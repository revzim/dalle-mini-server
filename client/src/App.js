import { useState, useEffect } from "react"
import * as axios from "axios"
import { Link, Button, Grid, Card, CardHeader, CardContent, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem, Box, Container, TextField, LinearProgress, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"

function App() {

  const defaultTitle = "dalle-client | revzim"

  const defaultSubHeader = "AI generated images from text"

  const github = "https://github.com/revzim"

  const [title, setTitle] = useState(defaultTitle)

  const [subHeader, setSubHeader] = useState(defaultSubHeader)

  const [loading, setLoading] = useState(false)

  const [imgText, setImgText] = useState("")

  const [imgVals, setImgVals] = useState([])

  const [imgCount, setImgCount] = useState(1)

  // const [queueStartTime, setQueueStartTime] = useState(null)

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
      setSubHeader("AI generated images from text")
    }
  }

  const handleImgCountChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    setImgCount(parseInt(val))
  }

  const queryImg = async (e) =>  {
    e.preventDefault()
    setImgVals([])
    if (imgCount <= 0 || imgText === "") return
    // setQueueStartTime(Date.now())
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
      // setQueueStartTime(null)
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
        <ImageListItem sx={{ listStyle: "none",  }} key={val}>
          <img style={{  }} src={localImgSrc} alt={val.substring(0, 12)} />
        </ImageListItem>
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
      <CardHeader sx={{ color: "#fff", textDecoration: "none" }}
        title={<Link sx={{ color: "#fff" }} target="_" href={github} underline="none">{title}</Link>}
        subheader={subHeader} />
        <Grid container spacing={1} direction="row" >
          <Grid item xs={9}>
            { getDalleImgTextForm() }
          </Grid >
          <Grid item xs={3} sx={{ }}>
            { getDalleImgCountForm() }
          </Grid>
        </Grid>
      <Button
        disabled={loading} 
        onClick={queryImg}
        variant="contained"
        sx={{ marginTop: 1, color: "#fff", backgroundColor: purple[800], fontWeight: "bold", width: "100%",  height: "100%" }}
        >generate
      </Button>
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
              <ImageList sx={{ }} /*cols={3} rowHeight={250}*/ >
                { getRenderContent(imgVals) }
              </ImageList>
            </Container>
          ) : null
        }
      </CardContent>
    </Card>
  );
}

export default App;
