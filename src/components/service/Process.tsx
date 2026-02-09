interface ProcessInterface {
  index: number,
  name: string,
  desc: string,
}

const Process = ({ index, name, desc }: ProcessInterface) => {
  const style = index != 3 ? "border-r border-px border-(--border)" : ""

  return (
    <div className={`${style} group flex flex-col items-start justify-start p-10 gap-y-4 transition-colors hover:bg-(--background)`}>
      <span className="text-(--primary)/70 group-hover:text-(--primary) text-3xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h1 className="text-4xl">
        {name}
      </h1>
      <p className="text-lg text-(--muted-foreground)">
        {desc}
      </p>
    </div>
  )
}

export default Process