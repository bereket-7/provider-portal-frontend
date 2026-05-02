"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
    ArrowLeft, 
    CheckCircle, 
    ChevronRight, 
    Info, 
    Plus, 
    Save, 
    X,
    Receipt,
    DollarSign,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useReconciliation } from "@/hooks/useReconciliations";
import { updateReconciliation } from "@/_service/actions/reconciliation-actions";
import { toast } from "sonner";
import { useEffect } from "react";

const reconciliationSchema = z.object({
    remarks: z.array(z.object({
        id: z.string().optional(),
        remarkCode: z.string().min(1, "Required"),
        message: z.string().optional(),
    })),
    adjustments: z.array(z.object({
        id: z.string().optional(),
        adjustmentGroupCode: z.string().min(1, "Required"),
        adjustmentReasonCode: z.string().min(1, "Required"),
        adjustmentAmount: z.string().min(1, "Required"),
    })),
});

type ReconciliationFormValues = z.infer<typeof reconciliationSchema>;

interface ReconciliationDetailViewProps {
    id: string;
}

export function ReconciliationDetailView({ id }: ReconciliationDetailViewProps) {
    const { data: reconciliation, isLoading, refetch } = useReconciliation(id);

    const form = useForm<ReconciliationFormValues>({
        resolver: zodResolver(reconciliationSchema),
        defaultValues: {
            remarks: [],
            adjustments: [],
        },
    });

    const { fields: remarkFields, append: appendRemark, remove: removeRemark } = useFieldArray({
        control: form.control,
        name: "remarks",
    });

    const { fields: adjustmentFields, append: appendAdjustment, remove: removeAdjustment } = useFieldArray({
        control: form.control,
        name: "adjustments",
    });

    useEffect(() => {
        if (reconciliation) {
            form.reset({
                remarks: reconciliation.remarks || [],
                adjustments: reconciliation.adjustments || [],
            });
        }
    }, [reconciliation, form]);

    const onSubmit = async (values: ReconciliationFormValues) => {
        const loadingId = toast.loading("Updating reconciliation...");
        try {
            const input = {
                id: id,
                remarks: values.remarks.map(r => ({
                    remarkCode: r.remarkCode,
                    message: r.message
                })),
                adjustments: values.adjustments.map(a => ({
                    adjustmentGroupCode: a.adjustmentGroupCode,
                    adjustmentReasonCode: a.adjustmentReasonCode,
                    adjustmentAmount: a.adjustmentAmount
                }))
            };

            const response = await updateReconciliation(input);
            if (response.ok) {
                toast.success("Reconciliation updated successfully", { id: loadingId });
                refetch();
            } else {
                toast.error(response.message || "Update failed", { id: loadingId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: loadingId });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-5">
                <Link href="/edi-835" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Remittances
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20">
                            <Receipt className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black tracking-tight text-foreground uppercase">
                                    REC-{id.substring(0, 8)}
                                </h1>
                                <Badge className={`rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${reconciliation?.reconciliationStatus === "MATCHED" ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                    {reconciliation?.reconciliationStatus}
                                </Badge>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                                Payment Reconciliation • Check: {reconciliation?.payment835?.checkNumber}
                            </p>
                        </div>
                    </div>
                    <PremiumButton onClick={form.handleSubmit(onSubmit)} className="px-8 shadow-xl shadow-primary/20">
                        <Save className="w-4 h-4 mr-2" />
                        Sync Changes
                    </PremiumButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 space-y-8 p-8 border-border/40 bg-card rounded-[2.5rem]">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Adjustment Details
                            </h3>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => appendAdjustment({ adjustmentGroupCode: "CO", adjustmentReasonCode: "", adjustmentAmount: "0.00" })}
                                className="h-8 rounded-lg border-primary/20 text-[10px] font-black uppercase"
                            >
                                <Plus className="w-3 h-3 mr-1.5" /> Add Adjustment
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {adjustmentFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-border/40 bg-primary/[0.01] relative group">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Group</label>
                                        <select {...form.register(`adjustments.${index}.adjustmentGroupCode`)} className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold">
                                            <option value="CO">CO (Contractual)</option>
                                            <option value="PR">PR (Patient Resp)</option>
                                            <option value="OA">OA (Other Adjust)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Reason</label>
                                        <input {...form.register(`adjustments.${index}.adjustmentReasonCode`)} placeholder="e.g. 45" className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold" />
                                    </div>
                                    <div className="space-y-1.5 col-span-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Amount</label>
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1">
                                                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                <input {...form.register(`adjustments.${index}.adjustmentAmount`)} className="w-full pl-7 pr-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-black tabular-nums" />
                                            </div>
                                            <button type="button" onClick={() => removeAdjustment(index)} className="p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all border border-transparent hover:border-rose-200">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {adjustmentFields.length === 0 && <p className="text-[10px] font-bold text-muted-foreground italic py-4">No adjustments recorded.</p>}
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-border/40">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Payment Remarks
                            </h3>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => appendRemark({ remarkCode: "", message: "" })}
                                className="h-8 rounded-lg border-emerald-500/20 text-[10px] font-black uppercase"
                            >
                                <Plus className="w-3 h-3 mr-1.5" /> Add Remark
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {remarkFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border border-border/40 bg-emerald-500/[0.01] relative group">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Code</label>
                                        <input {...form.register(`remarks.${index}.remarkCode`)} placeholder="e.g. N30" className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold uppercase" />
                                    </div>
                                    <div className="space-y-1.5 col-span-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Message</label>
                                        <div className="flex items-center gap-3">
                                            <input {...form.register(`remarks.${index}.message`)} placeholder="Description..." className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-medium flex-1 text-muted-foreground" />
                                            <button type="button" onClick={() => removeRemark(index)} className="p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all border border-transparent hover:border-rose-200">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {remarkFields.length === 0 && <p className="text-[10px] font-bold text-muted-foreground italic py-4">No remittance remarks.</p>}
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6 border-border/40 bg-slate-950 text-white rounded-[2rem] shadow-xl shadow-black/10">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-60">Reconciliation Summary</CardTitle>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                <span className="text-[9px] font-black uppercase opacity-40">Original Amount</span>
                                <span className="text-xl font-black tabular-nums">${reconciliation?.amount}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                <span className="text-[9px] font-black uppercase opacity-40">Adjustments</span>
                                <span className="text-xl font-black text-rose-400 tabular-nums">
                                    -${form.watch("adjustments").reduce((acc, curr) => acc + parseFloat(curr.adjustmentAmount || "0"), 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-4 flex flex-col gap-2">
                                <span className="text-[9px] font-black uppercase text-primary tracking-widest">Linked Claim</span>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-xs font-black uppercase tracking-tight">{reconciliation?.claimPayment835?.claim?.claimNumber}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
