import { FC } from "react"
import { chuniScorePlaylog } from "@/drizzle/schema"

interface Props {
  recentPlay: (typeof chuniScorePlaylog.$inferSelect)[]
}

const RecentUserAction: FC<Props> = ({ recentPlay }) => {
  return (
    <div className="bg-neutral">
      {recentPlay.map((item, key) => (
        <div key={key}>{item.maxCombo}</div>
      ))}
    </div>
  )
}

export default RecentUserAction
