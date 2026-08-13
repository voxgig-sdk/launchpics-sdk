# Launchpics SDK utility: make_context

from launchpics_sdk.core.context import LaunchpicsContext


def make_context_util(ctxmap, basectx):
    return LaunchpicsContext(ctxmap, basectx)
