import { z } from 'zod'

// A data de venda não pode ser posterior a data de hoje
const maxSellingDate = new Date()   // Hoje
maxSellingDate.setFullYear(maxSellingDate.getHours() - 24)  // 24 horas

// O ano de fabribação pode ter sido no maxinio a 83 anos atrás (1940)
const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear() - 83)


const Car = z.object({
  brand: 
    z.string()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caracter' })
    .max(25, { message: 'A marca pode conter, no máximo, 25 caracteres' }),
  
  model: 
    z.string()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caracter' })
    .max(25, { message: 'O modelo pode conter, no máximo, 25 caracteres' }),
  
  color: 
    z.string()
    .min(4, { message: 'A cor deve ter, no mínimo, 4 caracter' })
    .max(20, { message: 'A cor pode conter, no máximo, 20 caracteres' }),

  year_manufacture: 
    z.number()
    .min(minYearManufacture, { message: 'O ano de fabricação está muito no passado'})
    .nullable(),
  
  imported: 
    z.boolean(),
  
  plates: 
    z.string()
    .length(8, { message: 'A placa está incompleta'}),
  
  selling_date: 
  z.coerce.date()
  .max(maxSellingDate, { message: 'A data não pode ser posteior à de hoje' })
  .nullable(),

  selling_price: 
    z.number()
    .min(2000, { message: 'O valor de venda está muito baixo' }),
  
  customer_id: 
    z.number()
    .nullable()
})

export default Car