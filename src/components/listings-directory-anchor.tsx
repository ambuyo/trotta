import CardCategoryBox1 from '@/components/card-category-box1'
import { TCategory } from '@/data/categories'
import React from 'react'
import CardCategory1 from './card-category1'
import CardCategory3 from './card-category3'
import CardCategory4 from './card-category4'
import CardCategory5 from './card-category5'
import CardCategory6 from './card-category6'
import CardCategory7 from './card-category7'
import CardCategory8 from './card-category8'

interface ListingsDirectoryAnchorProps {
  categories: TCategory[]
  className?: string
  card?: 'box1' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}

const calculateTotalCount = (category: TCategory & { children?: TCategory[] }): number => {
  let total = category.count || 0
  if (category.children && Array.isArray(category.children)) {
    total += category.children.reduce((sum, child) => sum + (child.count || 0), 0)
  }
  return total
}

const ListingsDirectoryAnchor: React.FC<ListingsDirectoryAnchorProps> = ({
  categories,
  className = '',
  card = 'box1',
}) => {
  const renderCard = (category: TCategory & { children?: TCategory[] }) => {
    const categoryWithCount = {
      ...category,
      count: calculateTotalCount(category),
    }

    switch (card) {
      case 'box1':
        return <CardCategoryBox1 key={category.id} category={categoryWithCount} />
      case '1':
        return <CardCategory1 key={category.id} category={categoryWithCount} />
      case '2':
        return <CardCategory3 key={category.id} category={categoryWithCount} />
      case '3':
        return <CardCategory3 key={category.id} category={categoryWithCount} />
      case '4':
        return <CardCategory4 key={category.id} category={categoryWithCount} />
      case '5':
        return <CardCategory5 key={category.id} category={categoryWithCount} />
      case '6':
        return <CardCategory6 key={category.id} category={categoryWithCount} />
      case '7':
        return <CardCategory7 key={category.id} category={categoryWithCount} />
      case '8':
        return <CardCategory8 key={category.id} category={categoryWithCount} />

      default:
        return <CardCategoryBox1 key={category.id} category={categoryWithCount} />
    }
  }

  return (
    <div className={`w-full grid ${className} grid-cols-2 gap-5 sm:grid-cols-3 md:gap-6 lg:grid-cols-5`}>
      {categories.slice(0, 10).map(renderCard)}
    </div>
  )
}

export default ListingsDirectoryAnchor
