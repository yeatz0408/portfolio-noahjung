import { useState, useEffect } from 'react';

interface PaginatorProps {
  pageNum: number;
  setPageNum: (num: number) => void;
}

const Paginator = ({ pageNum, setPageNum }: PaginatorProps) => {
  const MIN = 1;
  const MAX = 8;

  const [pageNums, setPageNums] = useState<number[]>([]);
  const [hasMoveToFirstButton, setHasMoveToFirstButton] =
    useState<boolean>(false);
  const [hasMoveToLastButton, setHasMoveToLastButton] =
    useState<boolean>(false);

  if (pageNum < MIN || pageNum > MAX) {
    throw new Error(`Please choose page number between ${MIN} and ${MAX}`);
  }

  useEffect(() => {
    setPageNums([]);
    if (pageNum === MIN || pageNum === MIN + 1) {
      setPageNums([MIN, MIN + 1, MIN + 2]);
      setHasMoveToFirstButton(false);
      setHasMoveToLastButton(true);
    } else if (pageNum === MAX || pageNum === MAX - 1) {
      setPageNums([MAX - 2, MAX - 1, MAX]);
      setHasMoveToFirstButton(true);
      setHasMoveToLastButton(false);
    } else {
      setPageNums([pageNum - 1, pageNum, pageNum + 1]);
      setHasMoveToFirstButton(true);
      setHasMoveToLastButton(true);
    }
  }, [pageNum]);

  return (
    <>
      <div className="flex gap-4">
        {hasMoveToFirstButton && (
          <button
            className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm"
            onClick={() => setPageNum(MIN)}
          >
            {'<<'}
          </button>
        )}
        {pageNums.map((num) => (
          <button
            key={`pageNum-${num}`}
            className={`px-3 py-1 border border-gray-300 ${
              num === pageNum ? 'bg-blue-500 text-white' : 'bg-white'
            } ${num !== pageNum && 'hover:bg-gray-100'} text-sm`}
            onClick={() => setPageNum(num)}
            disabled={num === pageNum}
          >
            {num}
          </button>
        ))}
        {hasMoveToLastButton && (
          <button
            className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm"
            onClick={() => setPageNum(MAX)}
          >
            {'>>'}
          </button>
        )}
      </div>
    </>
  );
};

export default Paginator;
