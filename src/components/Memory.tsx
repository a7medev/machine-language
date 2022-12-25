import { toBin, toHex } from '../utils/bases';

interface MemoryProps {
  title: string;
  cells: number[];
}

function Memory({ cells, title }: MemoryProps) {
  return (
    <table className="border-collapse border text-center w-full">
      <caption className="text-lg font-bold text-center pb-2 sticky top-0 left-0 bg-white border-b-1 border-b-gray-200">
        {title}
      </caption>
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="border p-1 border-gray-200">Address</th>
          <th className="border p-1 border-gray-200">Binary</th>
          <th className="border p-1 border-gray-200">Hexadecimal</th>
        </tr>
      </thead>
      <tbody className="font-mono text-gray-700">
        {cells.map((value, index) => (
          <tr className="hover:bg-gray-50" key={index}>
            <td className="border p-1">{toHex(index)}</td>
            <td className="border p-1">{toBin(value)}</td>
            <td className="border p-1">{toHex(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Memory;
