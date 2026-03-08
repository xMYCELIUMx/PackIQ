import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function tenantError(entity: string) {
  return NextResponse.json({ error: `${entity} is outside your organization scope` }, { status: 403 });
}

export async function assertSiteInOrg(siteId: string, organizationId: string) {
  const site = await prisma.site.findFirst({ where: { id: siteId, organizationId }, select: { id: true } });
  return site ? null : tenantError("Site");
}

export async function assertTemplateInOrg(templateId: string, organizationId: string) {
  const template = await prisma.template.findFirst({ where: { id: templateId, organizationId }, select: { id: true } });
  return template ? null : tenantError("Template");
}

export async function assertAssetInOrg(assetId: string, organizationId: string) {
  const asset = await prisma.asset.findFirst({
    where: { id: assetId, productionLine: { site: { organizationId } } },
    select: { id: true },
  });
  return asset ? null : tenantError("Asset");
}

export async function assertProductionLineInOrg(productionLineId: string, organizationId: string) {
  const line = await prisma.productionLine.findFirst({
    where: { id: productionLineId, site: { organizationId } },
    select: { id: true },
  });
  return line ? null : tenantError("Production line");
}

export async function assertUserInOrg(userId: string, organizationId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId, organizationId, isActive: true }, select: { id: true } });
  return user ? null : tenantError("User");
}

export async function assertIssueInOrg(issueId: string, organizationId: string) {
  const issue = await prisma.issue.findFirst({ where: { id: issueId, site: { organizationId } }, select: { id: true } });
  return issue ? null : tenantError("Issue");
}

export async function assertCarInOrg(carId: string, organizationId: string) {
  const car = await prisma.cAR.findFirst({ where: { id: carId, vendor: { organizationId } }, select: { id: true } });
  return car ? null : tenantError("CAR");
}

export async function assertVendorInOrg(vendorId: string, organizationId: string) {
  const vendor = await prisma.vendor.findFirst({ where: { id: vendorId, organizationId }, select: { id: true } });
  return vendor ? null : tenantError("Vendor");
}

export async function assertFindingInOrg(findingId: string, organizationId: string) {
  const finding = await prisma.inspectionFinding.findFirst({
    where: { id: findingId, inspection: { site: { organizationId } } },
    select: { id: true },
  });
  return finding ? null : tenantError("Finding");
}
