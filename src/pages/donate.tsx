import React, { useState, useEffect } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { InputAdornment, LinearProgress, Box } from '@mui/material'
import Button from '@mui/material/Button'
import { db } from '../../firebase/initFirebas'
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { ContentPasteGo } from '@mui/icons-material'
import { DonateHeader, Header } from '@/components/header'
import { Footer } from '@/components/footer'
import PhoneIcon from '@mui/icons-material/Phone'
import { useRouter } from 'next/router'
import JSON5 from 'json5'
import { v4 as uuidv4 } from 'uuid'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

function getPaymentDetails(encodedPaymentDetails: any) {
  let paymentDetails = JSON5.parse(Buffer.from(encodedPaymentDetails, 'base64').toString().replace(/'/g, '"'))
  return {
    amount: parseFloat(paymentDetails.amount),
    status: paymentDetails.paymentstatus,
    orderId: paymentDetails.order_id,
  }
}

const Donate = () => {
  const router = useRouter()

  const [program, setProgram] = React.useState('UG')
  const [year, setYear] = React.useState('2012')
  const [amount, setAmount] = React.useState(500)
  const [progress, setProgress] = useState<any>('0')
  const [cummulativeAmount, setCummulativeAmount] = useState<any>('0')
  const [chardData, setChartData] = useState<any>([
    {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'UG',
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(255, 165, 0, 0.2)',
            'rgba(128, 0, 128, 0.2)',
            'rgba(255, 192, 203, 0.2)',
            'rgba(0, 128, 128, 0.2)',
            'rgba(165, 42, 42, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 128, 0,1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(128, 0, 128, 1)',
            'rgba(255, 192, 203, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(165, 42, 42, 1)',
            'rgba(128, 128, 128, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
          style: { fontSize: 16, fontWeight: 'bold', color: 'blue' },
        },
      ],
    },

    {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'MA',
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(255, 165, 0, 0.2)',
            'rgba(128, 0, 128, 0.2)',
            'rgba(255, 192, 203, 0.2)',
            'rgba(0, 128, 128, 0.2)',
            'rgba(165, 42, 42, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 128, 0,1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(128, 0, 128, 1)',
            'rgba(255, 192, 203, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(165, 42, 42, 1)',
            'rgba(128, 128, 128, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'YIF',
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(255, 165, 0, 0.2)',
            'rgba(128, 0, 128, 0.2)',
            'rgba(255, 192, 203, 0.2)',
            'rgba(0, 128, 128, 0.2)',
            'rgba(165, 42, 42, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 128, 0,1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(128, 0, 128, 1)',
            'rgba(255, 192, 203, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(165, 42, 42, 1)',
            'rgba(128, 128, 128, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
  ])

  const [formData, setFormData] = useState({
    id: uuidv4(),
    firstName: '',
    lastName: '',
    phone: '',
    amount: 500,
    program: '',
    year: '',
    email: '',
  })

  useEffect(() => {
    const hash = window.location.hash.substr(1) // get the fragment identifier
    const [encodedData, queryString] = hash.split('?') // split the hash into two parts

    // decode the data from the first part

    // get the value of the 'result' parameter from the second part
    const params = new URLSearchParams(queryString)
    const result = params.get('result')

    // the object from the first part of the URL
    if (result) {
      const data = JSON.parse(atob(encodedData))

      setFormData(data)
      const paymentDetails = getPaymentDetails(result)
      if (paymentDetails.status == 'success') {
        const updateCharts = async () => {
          // Get references to chart data documents
          const chartOneDataRef = doc(db, 'chart_data_one', 'one')
          const chartTwoDataRef = doc(db, 'chart_data_one', 'amount')
          const chartThreeDataRef = doc(db, 'chart_data_one', 'progress')

          // Fetch chart data documents from Firestore
          const chartOneSnapshot = await getDoc(chartOneDataRef)
          const chartOneData = chartOneSnapshot.data() as any

          const chartTwoSnapshot = await getDoc(chartTwoDataRef)
          const chartTwoData = chartTwoSnapshot.data() as any

          const chartThreeSnapshot = await getDoc(chartThreeDataRef)
          const chartThreeData = chartThreeSnapshot.data() as any

          // Update chart data if it exists
          if (chartOneData) {
            const parsedChartData = chartOneData.one.map((item: any) => eval(`(${item})`))
            const updatedChartData = parsedChartData.map((chart: any) => {
              const updatedDatasets = chart.datasets.map((dataset: any) => {
                if (dataset.label === data.program) {
                  return {
                    ...dataset,
                    data: dataset.data.map((value: any, index: any) =>
                      chart.labels[index] === data.year ? value + 1 : value
                    ),
                  }
                }
                return dataset
              })
              return { ...chart, datasets: updatedDatasets }
            })
            updateDoc(chartOneDataRef, { one: updatedChartData.map((item: any) => JSON.stringify(item)) })
          }

          if (chartTwoData) {
            const sumAmount = parseInt(data.amount) + parseInt(chartTwoData.amount)
            updateDoc(chartTwoDataRef, { amount: JSON.stringify(sumAmount) })
          }

          if (chartThreeData) {
            const updatedProgress = parseInt(chartThreeData.progress) + 1
            updateDoc(chartThreeDataRef, { progress: JSON.stringify(updatedProgress) })
          }

          addDoc(collection(db, 'user'), {
            phoneNumber: data.phone,
            amount: data.amount,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: JSON.stringify(data.lastName),
            program: data.program,
            year: data.year,
            email: data.email,
          })
        }
        updateCharts()
        router.push('/donate')
        router.push('/success')
      } else {
        router.push('/failure')
      }
    } // the value of the 'result' parameter
  }, [])

  useEffect(() => {
    const getPost = async () => {
      const postCol = doc(db, 'chart_data_one', 'one') as any
      const postSnapshot = await getDoc(postCol)
      const postList = postSnapshot.data() as any
      // Set the result to the useState.
      if (postList) {
        const r = postList.one.map((item: any) => eval(`(${item})`))
        setChartData(r)
      }
    }
    const getAmount = async () => {
      const amountCol = doc(db, 'chart_data_one', 'amount') as any
      const amountSnap = await getDoc(amountCol)
      const fireamount = amountSnap.data() as any
      // Set the result to the useState.
      setCummulativeAmount(fireamount.amount)
    }
    const getPercent = async () => {
      const progressCol = doc(db, 'chart_data_one', 'progress') as any
      const progressSnap = await getDoc(progressCol)
      const progressamount = progressSnap.data() as any
      setProgress(progressamount.progress)
      // Set the result to the useState.
    }
    // Call the async function.
    getPost().catch(console.error)
    getAmount().catch(console.error)
    getPercent().catch(console.error)
  })

  const options = {
    scales: {
      y: {
        max: 100,
      },
    },
    legend: {
      labels: {
        font: {
          size: 14,
          weight: 'bold',
        },
        color: 'red',
      },
    },
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const myNumberString = parseFloat(formData.amount.toString()).toFixed(2)

    const dataStr = JSON.stringify(formData)
    const dataB64 = btoa(dataStr)

    let payload = JSON.stringify({
      amount: parseFloat(myNumberString),
      PaymentTypeId: 'PTID#00041',
      order_id: formData.id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      returnurl: `https://fundraiser-theta.vercel.app/donate#${dataB64}`,
    })

    const redirecrt = 'https://payments.ashoka.edu.in/dp/pg.aspx?value='.concat(Buffer.from(payload).toString('base64'))
    window.location.href = redirecrt
  }

  return (
    <>
      <DonateHeader />
      <div className="grid_program">
        <div className="grid_ug">
          <Bar data={chardData[0]} height={250} options={options} />
        </div>

        <div className="grid_ma">
          <Bar data={chardData[1]} height={250} options={options} />
        </div>
        <div className="grid_yif">
          <Bar data={chardData[2]} height={250} options={options} />
        </div>
      </div>
      <Box className="bar">
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={parseInt(progress)}
          sx={{ borderRadius: 10, height: `${5}vh` }}
        />

        <span>₹{parseInt(cummulativeAmount)}</span>
      </Box>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'block', marginTop: `${1}rem` }}>
        <div className="select_info">
          <div className="input_width">
            <TextField
              id="outlined-required"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              label="First Name"
              fullWidth
            />
          </div>
          <div className="input_width">
            <TextField
              id="outlined-required"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              label="Last Name"
              fullWidth
            />
          </div>
        </div>
        <div className="select_info">
          <div className="input_width">
            <TextField
              required
              label="Phone number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
          <div className="input_width">
            <TextField
              required
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                inputProps: { min: 1 },
              }}
              fullWidth
            />
          </div>
        </div>
        <div className="select_info">
          <div className="input_width">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Program</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="program"
                value={formData.program}
                onChange={handleChange}
                label="Program"
              >
                <MenuItem value={'UG'}>UG</MenuItem>
                <MenuItem value={'MA'}>MA</MenuItem>
                <MenuItem value={'YIF'}>YIF</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input_width">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="year"
                value={formData.year}
                onChange={handleChange}
                label="Year"
                defaultValue="2012"
              >
                <MenuItem value={'2012'}>2012</MenuItem>
                <MenuItem value={'2013'}>2013</MenuItem>
                <MenuItem value={'2014'}>2014</MenuItem>
                <MenuItem value={'2015'}>2015</MenuItem>
                <MenuItem value={'2016'}>2016</MenuItem>
                <MenuItem value={'2017'}>2017</MenuItem>
                <MenuItem value={'2018'}>2018</MenuItem>
                <MenuItem value={'2020'}>2020</MenuItem>
                <MenuItem value={'2021'}>2021</MenuItem>
                <MenuItem value={'2022'}>2022</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="email_field">
          <div className="email_width">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
          </div>
        </div>
        <div className="main_button">
          <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <Button
              variant="contained"
              type="submit"
              style={{ height: `${50}px`, marginTop: `${2}rem`, width: `${90}%` }}
            >
              Donate
            </Button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: `${5}rem` }}>
        <Footer />
      </div>
    </>
  )
}

export default Donate
