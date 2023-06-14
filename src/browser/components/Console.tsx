const Console = ({active, input}: {active: string, input: string}) => {
  return (
    <div className={`${active} flex justify-center p-3`}>
        <textarea id="console" className="bg-neutral-700 text-xl p-3 rounded-md" placeholder={input} rows={15} cols={50} disabled></textarea>
    </div>
  )
}

export default Console