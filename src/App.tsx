import { FilteredInfluencerGrid } from './components/FilteredInfluencerGrid'
import { motion } from 'framer-motion'

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-8">Influencer Search</h1>
      <FilteredInfluencerGrid />
    </motion.div>
  )
}

export default App
