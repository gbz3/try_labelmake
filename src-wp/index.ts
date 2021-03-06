import { hello } from './modules/sub'
import labelmake from 'labelmake'
import { Template } from 'labelmake/dist/types/type'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

hello()

;(async () => {
  const template: Template = {
    basePdf: { width: 200, height: 100 },
    schemas: [
      {
        field1: { type: "text", width: 50, height: 50, position: { x: 20, y: 20 }, fontSize: 30 },
        field2: { type: "text", width: 50, height: 50, position: { x: 20, y: 40 }, fontSize: 20 },
      }
    ],
  }
  const inputs = [
    { field1: "ABC", field2: "#$%&'()=~|" },
  ]
  const pdf = await labelmake({ template, inputs })
  const blob = new Blob([pdf.buffer], { type: "application/pdf" })
  const container = document.getElementById('pdf')
  if (container instanceof HTMLIFrameElement) container.src = URL.createObjectURL(blob)
})()
