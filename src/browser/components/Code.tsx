const Code = ({active, input}: {active: string, input: string}) => {
  return (
    <div className={`${active} flex justify-center p-3`}>
        <textarea id="console" className="bg-neutral-100 text-sm placeholder:text-inherit p-3 rounded-md drop-shadow-lg" placeholder={input} rows={15} cols={80} disabled></textarea>
    </div>
  )
}

export default Code