export const metadata = { title: "Size Guide — Harrison Whitmore" };

const menTops = [
  { size: "XS", chest: "86–89", waist: "71–74" },
  { size: "S", chest: "91–94", waist: "76–79" },
  { size: "M", chest: "97–100", waist: "81–84" },
  { size: "L", chest: "102–105", waist: "86–89" },
  { size: "XL", chest: "107–112", waist: "91–96" },
];

const womenTops = [
  { size: "XS", bust: "78–81", waist: "60–63" },
  { size: "S", bust: "83–86", waist: "65–68" },
  { size: "M", bust: "88–91", waist: "70–73" },
  { size: "L", bust: "93–98", waist: "75–80" },
  { size: "XL", bust: "100–105", waist: "82–87" },
];

const menBottoms = [
  { size: "28", waist: "71", inseam: "81" },
  { size: "30", waist: "76", inseam: "81" },
  { size: "32", waist: "81", inseam: "82" },
  { size: "34", waist: "86", inseam: "82" },
  { size: "36", waist: "91", inseam: "83" },
  { size: "38", waist: "97", inseam: "83" },
];

const womenBottoms = [
  { size: "4", waist: "61", hip: "88" },
  { size: "6", waist: "64", hip: "91" },
  { size: "8", waist: "67", hip: "94" },
  { size: "10", waist: "71", hip: "98" },
  { size: "12", waist: "76", hip: "103" },
  { size: "14", waist: "81", hip: "108" },
];

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-fg-muted">
            {headers.map((h) => (
              <th key={h} className="py-2 pr-6 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border">
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 pr-6">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-2 font-display text-4xl">Size Guide</h1>
      <p className="mb-12 max-w-lg text-fg-muted">
        All measurements are in centimetres, taken directly on the body. If you fall between two
        sizes, we recommend sizing up for our tailored-fit pieces.
      </p>

      <div className="space-y-14">
        <section>
          <h2 className="mb-4 font-display text-xl">Men&rsquo;s Tops</h2>
          <Table headers={["Size", "Chest", "Waist"]} rows={menTops.map((r) => [r.size, r.chest, r.waist])} />
        </section>
        <section>
          <h2 className="mb-4 font-display text-xl">Men&rsquo;s Bottoms</h2>
          <Table headers={["Size", "Waist", "Inseam"]} rows={menBottoms.map((r) => [r.size, r.waist, r.inseam])} />
        </section>
        <section>
          <h2 className="mb-4 font-display text-xl">Women&rsquo;s Tops</h2>
          <Table headers={["Size", "Bust", "Waist"]} rows={womenTops.map((r) => [r.size, r.bust, r.waist])} />
        </section>
        <section>
          <h2 className="mb-4 font-display text-xl">Women&rsquo;s Bottoms</h2>
          <Table headers={["Size", "Waist", "Hip"]} rows={womenBottoms.map((r) => [r.size, r.waist, r.hip])} />
        </section>
      </div>
    </div>
  );
}
