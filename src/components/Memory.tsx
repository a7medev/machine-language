import { toBin, toHex } from '../utils/bases';

interface MemoryProps {
  title: string;
  cells: number[];
  id: string;
}

function Memory({ cells, title, id }: MemoryProps) {
  return (
    <table className="border-collapse border text-center w-full">
      <caption className="text-lg font-bold text-center pb-2 sticky top-0 left-0 bg-white dark:bg-gray-900">
        {title}
      </caption>
      <thead>
        <tr className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          <th className="border p-1 border-gray-200 dark:border-gray-600">
            Address
          </th>
          <th className="border p-1 border-gray-200 dark:border-gray-600">
            Binary
          </th>
          <th className="border p-1 border-gray-200 dark:border-gray-600">
            Hexadecimal
          </th>
        </tr>
      </thead>
      <tbody className="font-mono text-gray-700 dark:text-gray-400">
        {cells.map((value, index) => (
          <tr
            className="hover:bg-gray-50 dark:hover:bg-gray-800"
            key={index}
            id={id + index}
          >
            <td className="border p-1 dark:border-gray-600">{toHex(index)}</td>
            <td className="border p-1 dark:border-gray-600">{toBin(value)}</td>
            <td className="border p-1 dark:border-gray-600">{toHex(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Memory;
