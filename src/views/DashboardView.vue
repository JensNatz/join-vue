<template>
    <div class="dashboard">
        <div class="dashboard-content">
            <div class="greeting"> {{ greetingByTime() }}, <span class="name">John Doe</span></div>
            <div class="content-row">
                <TaskDashboardIndicator theme="urgent" />
                <TaskDashboardIndicator />
                <TaskDashboardIndicator status="to-do" />
            </div>
            <div class="content-row">
                <TaskDashboardIndicator status="progress" />
                <TaskDashboardIndicator status="feedback" />
                <TaskDashboardIndicator status="done" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TaskDashboardIndicator from '@/components/molecules/TaskDasboardIndicator.vue';
import { resetDatabase } from '@/services/securityService';

resetDatabase(); // Just for demo purposes

const greetingByTime = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
}
</script>
<style lang="scss" scoped>
.dashboard {
    padding: 56px 24px 24px 24px;

    .dashboard-content {
        @include flex($direction: column);
        gap: 24px;

        .greeting {
            font-size: 40px;

            @media (max-width: $breakpoint-md) {
                font-size: 32px;
            }

            @media (max-width: $breakpoint-sm) {
                font-size: 24px;
            }

            .name {
                font-weight: 700;
                color: $primary-color;
            }
        }

        .content-row {
            @include flex($justify: space-between);
            gap: 16px;

            @media (max-width: $breakpoint-md) {
                gap: 12px;
            }

            @media (max-width: $breakpoint-sm) {
                gap: 8px;
            }

        }
    }


}
</style>
