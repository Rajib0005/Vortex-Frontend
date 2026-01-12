  import './App.css'
  import { Button } from './components/ui/button'

  function App() {

    return (
      <div className='border rounded-xl border-red-500 p-2 w-75'>
        <h1 className="text-3xl font-semibold">
          Vortex here...
        </h1>
        <Button className='mt-3 text-right' size={'sm'} variant={'default'} onClick={()=> console.log('hellllo')}>Click me</Button>
      </div>
    )
  }

  export default App
