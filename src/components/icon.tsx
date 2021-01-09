import React, { ReactElement } from "react";
import { CoursePartItemProps } from "../pages/courses/item/route";
import VideoPartItem from "../models/items/video";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import TextPartItem from "../models/items/text";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import CoursePartItem from "../models/items/item";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import QuizPartItem from "../models/items/quiz";

export default function CoursePartItemIcon({
  item,
}: CoursePartItemProps<CoursePartItem>): ReactElement {
  if (item instanceof VideoPartItem) return <PlayCircleOutlineOutlinedIcon />;
  else if (item instanceof TextPartItem) return <SubjectOutlinedIcon />;
  else if (item instanceof QuizPartItem) return <QuestionAnswerOutlinedIcon />;
  else return <InsertDriveFileOutlinedIcon />;
}
