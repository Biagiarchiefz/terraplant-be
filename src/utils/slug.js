import {prisma} from "../config/prismaConfig.js";

export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const generateUniqueSlug = async (name) => {
  let slug = slugify(name);
  let uniqueSlug = slug;
  let counter = 1;

  while (
    await prisma.plant.findUnique({
      where: { slug: uniqueSlug },
    })
  ) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};