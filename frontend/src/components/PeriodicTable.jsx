import React, { useState } from 'react';
import elementsData from '../data/elements.json';

// 定义元素卡片组件
const ElementCard = ({ element, onElementClick, isActive }) => {
  const { atomicNumber, symbol, name, chineseName, category, color } = element;

  return (
    <div
      className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg ${isActive ? 'ring-2 ring-offset-2 ring-offset-gray-900' : ''}`}
      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}` }}
      onClick={() => onElementClick(element)}
    >
      <div className="absolute top-1 right-1 text-xs opacity-70 font-medium">{atomicNumber}</div>
      <div className="text-2xl font-bold text-center my-1" style={{ color }}>{symbol}</div>
      <div className="text-sm text-center mb-1">{name}</div>
      <div className="text-xs text-center opacity-80">{chineseName}</div>
    </div>
  );
};

// 定义元素详情模态框
const ElementDetailModal = ({ element, onClose }) => {
  if (!element) return null;

  const { name, chineseName, symbol, atomicNumber, category, color, atomicWeight, physicalProperties } = element;
  const { meltingPoint, boilingPoint, density, description } = physicalProperties;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-70">
      <div
        className="relative w-full max-w-lg rounded-xl overflow-hidden"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}` }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mr-4" style={{ backgroundColor: color, color: 'white' }}>
              {symbol}
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color }}>{name}</h2>
              <p className="text-xl opacity-80">{chineseName} ({atomicNumber})</p>
              <p className="text-sm opacity-70">{elementsData.categories[category] || category}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <p className="text-xs opacity-70">原子量</p>
              <p className="font-medium">{atomicWeight}</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <p className="text-xs opacity-70">熔点 (°C)</p>
              <p className="font-medium">{meltingPoint}</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <p className="text-xs opacity-70">沸点 (°C)</p>
              <p className="font-medium">{boilingPoint}</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <p className="text-xs opacity-70">密度 (g/cm³)</p>
              <p className="font-medium">{density}</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <p className="text-sm opacity-70 mb-2">物理性质描述</p>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 主周期表组件
const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const elements = elementsData.elements;

  // 按原子序数排序元素
  const sortedElements = [...elements].sort((a, b) => a.atomicNumber - b.atomicNumber);

  // 过滤元素（如果选择了特定类别）
  const filteredElements = activeCategory
    ? sortedElements.filter(element => element.category === activeCategory)
    : sortedElements;

  // 处理元素点击事件
  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  // 关闭详情模态框
  const closeDetailModal = () => {
    setSelectedElement(null);
  };

  // 切换类别筛选
  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">元素周期表</h1>
        <p className="text-center text-gray-400 mb-8">探索化学元素的奥秘，点击元素查看详细物理性质</p>

        {/* 类别筛选器 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={`px-3 py-1 rounded-full text-sm transition-all ${!activeCategory ? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveCategory(null)}
          >
            全部元素
          </button>
          {Object.keys(elementsData.categories).map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm transition-all ${activeCategory === category ? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => toggleCategory(category)}
            >
              {elementsData.categories[category]}
            </button>
          ))}
        </div>

        {/* 元素周期表网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredElements.map((element) => (
            <ElementCard
              key={element.atomicNumber}
              element={element}
              onElementClick={handleElementClick}
              isActive={selectedElement?.atomicNumber === element.atomicNumber}
            />
          ))}
        </div>

        {/* 元素详情模态框 */}
        <ElementDetailModal element={selectedElement} onClose={closeDetailModal} />
      </div>
    </div>
  );
};

export default PeriodicTable;