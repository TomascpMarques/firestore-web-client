"use client";

import { ImageLoaderProps } from "next/image";
import { avatar_buckets } from "../paths";

export default function bucketStorageAvatarImageLoader({
  src,
}: ImageLoaderProps) {
  return `${avatar_buckets}/users/avatar/${src}`;
}
